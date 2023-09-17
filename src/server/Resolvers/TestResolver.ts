import { testModel, Test } from '@/server/Models/TestModel';
import {
  Resolver,
  Args,
  Ctx,
  Mutation,
  Query,
  Authorized,
  Arg,
  UseMiddleware,
} from 'type-graphql';
import * as TestTg from '@/server/TypeGraphql/Test';
import type { ContextT } from '@/generated/User';
import { HttpCode } from '@/utils/HttpCode';
import {
  errorResponse,
  generatePagination,
  generateSlug,
} from '../Helpers/SharedHelper';
import format from '@/server/Helpers/FormatHelper';
import { attendantModel } from '../Models/AttendantModel';
import { TestStatus } from '@/generated/Enum';
import { AttendantHelper, cryptr } from '../Helpers/AttendantHelper';
import { PaginationArgs } from '../TypeGraphql/Question';
import { format as formatDate, compareDesc } from 'date-fns';
import { verifyTestUri } from '@/server/Middlewares/TestMiddleware';
import { questionModel } from '../Models/QuestionModel';
import mongoose from 'mongoose';
import { sendEmail } from '../Helpers/MailHelper';

@Resolver()
export class TestResolver extends AttendantHelper {
  @Authorized()
  @Mutation(() => TestTg.AddTestResponse)
  async addTest(
    @Args() args: TestTg.AddTestArgs,
    @Ctx() ctx: ContextT,
  ): Promise<TestTg.AddTestResponse> {
    try {
      const { req } = ctx;

      const startDate = formatDate(new Date(args.startDate), 'MM/dd/yyyy');

      const endDate = formatDate(new Date(args.endDate), 'MM/dd/yyyy');

      const compare = compareDesc(new Date(startDate), new Date(endDate));

      if (compare === -1) {
        return errorResponse('end date should be greater than start date');
      }

      const add = await testModel.create({
        title: args.title,
        managerId: req.session.userId,
        slug: generateSlug(args.title),
        startDate,
        endDate,
        passMark: Number(args.passMark.toFixed()),
        subject: args.subject,
      });

      return {
        data: format.getTest(add, true) as Test,
        message: 'Saved Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Authorized()
  @Query(() => TestTg.GetMyTestResponse)
  async getMyTests(
    @Ctx() ctx: ContextT,
    @Args() args: PaginationArgs,
  ): Promise<TestTg.GetMyTestResponse> {
    try {
      const { req } = ctx;

      const filter = {
        managerId: req.session.userId,
      };

      const pagination = await generatePagination(testModel, args, filter);

      const find = await testModel
        .find(filter)
        .limit(pagination.limit)
        .skip(pagination.offset)
        .populate({ path: 'questions.question', model: 'Question' })
        .populate({ path: 'attendants.attendant', model: 'Attendant' })
        .sort({ updatedAt: -1 });

      return {
        items: find.map((item) => format.getTest(item)),
        totalDocs: pagination.totalDocs,
        totalPages: pagination.totalPages,
      };
    } catch (error: any) {
      return errorResponse(error.message, HttpCode.ServerError);
    }
  }

  @Authorized()
  @Mutation(() => TestTg.AddTestResponse)
  async publishTest(
    @Args() args: TestTg.PublishTestArgs,
    @Ctx() ctx: ContextT,
  ): Promise<TestTg.AddTestResponse> {
    try {
      const { req } = ctx;

      const checkTest = await testModel.findOne({
        $and: [{ _id: args.testId }, { managerId: req.session.userId }],
      });

      if (!checkTest) {
        return errorResponse('You are not allowed to perform this actions');
      }

      if (checkTest.status === TestStatus.Published) {
        return errorResponse('Already Published');
      }

      await testModel.updateOne(
        { _id: checkTest._id },
        { $set: { status: TestStatus.Published } },
      );

      const getAttendants = await attendantModel
        .find({
          $and: [{ testId: checkTest._id }],
        })
        .select('_id');

      if (getAttendants.length > 0) {
        // generate unique test uri of each attendant
        for (const attendant of getAttendants) {
          await attendantModel.updateOne(
            { $and: [{ _id: attendant._id }, { testId: checkTest._id }] },
            {
              $set: {
                testUri: this.generateUniqueTestUri(
                  checkTest._id,
                  attendant._id,
                ),
              },
            },
          );
        }

        // send email
        const findAttendant = await attendantModel.find({
          testId: checkTest._id,
        });

        if (findAttendant.length > 0) {
          const subject = 'Invitation for assessment';

          for (const c of findAttendant) {
            sendEmail({
              receivers: [c.email],
              subject,
              html: `<p>Dear Student,</p><br/><p>You have been invited todo the assessment.</p>
              <p>Click on the link below to start.</p>
              <p><a href={${c.testUri}} target="__blank">${c.testUri}</a></p>`,
            }).catch((e) => e);
          }
        }
      }
      return {
        message: 'Published Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Authorized()
  @Query(() => TestTg.GetSingleTestResponse)
  async getSingleTest(
    @Arg('slug') slug: string,
    @Ctx() ctx: ContextT,
  ): Promise<TestTg.GetSingleTestResponse> {
    try {
      const { req } = ctx;

      const find = await testModel
        .findOne({
          $and: [{ slug }, { managerId: req.session.userId }],
        })
        .populate({ path: 'questions.question', model: 'Question' })
        .populate({ path: 'attendants.attendant', model: 'Attendant' });

      if (!find) {
        return errorResponse('Not Found');
      }

      return {
        data: format.getTest(find) as Test,
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @UseMiddleware(verifyTestUri)
  @Mutation(() => TestTg.VerifyTestUriResponse)
  async verifyTestUri(
    @Args() args: TestTg.VerifyTestUriArgs,
  ): Promise<TestTg.VerifyTestUriResponse> {
    try {
      const attendantId = cryptr.decrypt(args.attendant);

      const testId = cryptr.decrypt(args.test);

      const findAttendant = await attendantModel.findById(attendantId);

      const findTest = await testModel.findById(testId);

      const findLinkedQuestion = await questionModel
        .find({
          'tests.test': new mongoose.Types.ObjectId(testId),
        })
        .countDocuments();

      if (findAttendant && findTest) {
        return {
          verified: true,
          attendant: format.getAttendant(findAttendant),
          test: {
            ...format.getTest(findTest),
            questions: undefined,
            attendants: undefined,
          },
          numberOfQuestions: findLinkedQuestion,
        };
      }
      return {
        verified: false,
      };
    } catch (error) {
      return {
        verified: false,
        ...errorResponse(undefined, HttpCode.ServerError),
      };
    }
  }
}

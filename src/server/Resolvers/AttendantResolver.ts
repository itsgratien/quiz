import {
  Resolver,
  Mutation,
  Authorized,
  Ctx,
  Arg,
  Args,
  Query,
  UseMiddleware,
} from 'type-graphql';
import { attendantModel, AttendantRefTest } from '../Models/AttendantModel';
import {
  errorResponse,
  generatePagination,
} from '@/server/Helpers/SharedHelper';
import type { ContextT } from '@/generated/User';
import * as attendantTg from '../TypeGraphql/Attendant';
import format from '../Helpers/FormatHelper';
import { HttpCode } from '@/utils/HttpCode';
import { testModel } from '@/server/Models/TestModel';
import { AttendantHelper, cryptr } from '../Helpers/AttendantHelper';
import { AssignAttendantToTestArgs } from '@/generated/Attendant';
import { AttendantStatus } from '@/generated/Enum';
import { verifyTestUri } from '@/server/Middlewares/TestMiddleware';

@Resolver()
export class AttendantResolver extends AttendantHelper {
  @Authorized()
  @Mutation(() => attendantTg.AddAttendantResponse)
  async addAttendant(
    @Ctx() ctx: ContextT,
    @Arg('args', () => attendantTg.AddAttendantArgs)
    args: attendantTg.AddAttendantArgs,
    @Arg('testId') testId: string,
  ): Promise<attendantTg.AddAttendantResponse> {
    try {
      const { req } = ctx;
      const checkTestOwner = await testModel.findOne({
        $and: [{ _id: testId }, { managerId: req.session.userId }],
      });

      if (!checkTestOwner) {
        return errorResponse('You are not allowed to perform this action');
      }

      const checkEmailAndTest = await attendantModel.findOne({
        $and: [{ testId }, { email: args.email }],
      });

      if (checkEmailAndTest) {
        return errorResponse('Attendant Already Assigned To The Test');
      }

      const add = await attendantModel.create({ ...args, testId });

      await this.assignAttendantsToTest([{ attendant: add._id }], testId);
      return {
        message: 'Saved Successfully',
        data: format.getAttendant(add),
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Authorized()
  @Mutation(() => attendantTg.AddMoreAttendantResponse)
  async addMoreAttendant(
    @Arg('candidates', (type) => [attendantTg.AddAttendantArgs])
    candidates: attendantTg.AddAttendantArgs[],
    @Arg('testId') testId: string,
    @Ctx() ctx: ContextT,
  ): Promise<attendantTg.AddMoreAttendantResponse> {
    try {
      const { req } = ctx;

      const checkTest = await testModel.findOne({
        $and: [{ _id: testId }, { managerId: req.session.userId }],
      });

      if (!checkTest) {
        return errorResponse('You are not allowed to perform this action');
      }

      const checkDuplicateEmail = this.findDuplicateEmail(candidates);

      if (checkDuplicateEmail) {
        return errorResponse(
          `The following emails are duplicate. ${checkDuplicateEmail}`,
        );
      }

      const checkDuplicateEmailFromDb = await attendantModel.findOne({
        $and: [
          { testId },
          { email: { $in: candidates.map((item) => item.email) } },
        ],
      });

      if (checkDuplicateEmailFromDb) {
        return errorResponse(
          `Attendant With This Email(${checkDuplicateEmailFromDb.email}) Already Assigned To The Test.`,
        );
      }

      const values = candidates.map((item) => ({ ...item, testId }));

      const add = await attendantModel.insertMany(values);

      const items = add.map((item) => format.getAttendant(item));

      await this.assignAttendantsToTest(
        items.map((item) => ({ attendant: String(item._id) })),
        testId,
      );

      return {
        message: 'Saved Successfuly',
        items,
      };
    } catch (error) {
      console.log('error:', error);
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  private assignAttendantsToTest = async (
    values: AssignAttendantToTestArgs[],
    testId: string,
  ) => {
    const findTest = await testModel.findById(testId);

    if (findTest) {
      const storedAttendants = findTest.attendants || [];

      const change = await testModel.updateMany(
        { _id: testId },
        { $set: { attendants: [...storedAttendants, ...values] } },
      );

      if (change.modifiedCount !== 0) {
        return true;
      }
    }
    return false;
  };

  @Authorized()
  @Query(() => attendantTg.GetAttendantByTestResponse)
  async getAttendantByTest(
    @Args() args: attendantTg.GetAttendantByTestArgs,
  ): Promise<attendantTg.GetAttendantByTestResponse> {
    try {
      const filterQuery = { testId: args.testId };
      const pagination = await generatePagination(
        attendantModel,
        args,
        filterQuery,
      );

      const find = await attendantModel
        .find(filterQuery)
        .limit(pagination.limit)
        .skip(pagination.offset)
        .sort({ updatedAt: -1 });

      const startedDoc = await attendantModel
        .find({ $and: [filterQuery, { status: AttendantStatus.Started }] })
        .count();

      const inProgressDoc = await attendantModel
        .find({ $and: [filterQuery, { status: AttendantStatus.InProgress }] })
        .count();

      const completedDoc = await attendantModel
        .find({ $and: [filterQuery, { status: AttendantStatus.Completed }] })
        .count();

      return {
        items: find.map((item) => format.getAttendant(item)),
        totalDocs: pagination.totalDocs,
        totalPages: pagination.totalPages,
        inProgressDoc,
        startedDoc,
        completedDoc,
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Authorized()
  @Query(() => attendantTg.GetAttendantByTestResponse)
  async getAttendantById(
    @Arg('attendantId') attendantId: string,
  ): Promise<attendantTg.GetAttendantByTestResponse> {
    try {
      const find = await attendantModel.findById(attendantId).populate({
        model: 'Test',
        path: 'testId',
        select: '_id title status',
      });

      let refTest: AttendantRefTest | undefined;

      if (find && find.testId) {
        refTest = find.testId as AttendantRefTest;
      }

      return {
        data: find ? format.getAttendant(find, refTest) : undefined,
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @UseMiddleware(verifyTestUri)
  @Query(() => attendantTg.WhoIsDoingQuizResponse)
  async whoIsDoingQuiz(
    @Args() args: attendantTg.WhoIsDoingQuizArgs,
  ): Promise<attendantTg.WhoIsDoingQuizResponse> {
    try {
      const attendantId = cryptr.decrypt(args.attendant);

      const findAttendant = await attendantModel.findById(attendantId);

      if (!findAttendant) {
        return errorResponse('Attendant Not Found');
      }
      return {
        attendant: format.getAttendant(findAttendant),
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @UseMiddleware(verifyTestUri)
  @Mutation(() => attendantTg.WhoIsDoingQuizResponse)
  async changeStatus(
    @Args() args: attendantTg.ChangeStatusArgs,
  ): Promise<attendantTg.WhoIsDoingQuizResponse> {
    try {
      const attendantId = cryptr.decrypt(args.attendant);

      const updateStatus = await attendantModel.findOneAndUpdate(
        { _id: attendantId },
        { $set: { status: args.status } },
        { returnOriginal: false },
      );

      if (updateStatus) {
        return {
          message: 'Updated Successfully',
          attendant: format.getAttendant(updateStatus),
        };
      }

      return errorResponse('Unable to continue this action');
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Mutation(() => attendantTg.WhoIsDoingQuizResponse)
  async updateAttendantImage(
    @Args() args: attendantTg.UpdateAttendImageArgs,
  ): Promise<attendantTg.WhoIsDoingQuizResponse> {
    try {
      const attendantId = args.attendantId;

      const find = await attendantModel.findById(attendantId);

      if (!find) {
        return errorResponse('Candidate not found');
      }

      await attendantModel.updateOne(
        { _id: find._id },
        { $set: { image: args.image } },
      );

      return { message: 'updated successful' };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

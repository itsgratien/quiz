import {
  Resolver,
  Mutation,
  Authorized,
  Ctx,
  Arg,
  Args,
  Query,
} from 'type-graphql';
import { attendantModel, AttendantRefTest } from '../Models/AttendantModel';
import {
  errorResponse,
  generatePagination,
} from '@/server/Helpers/SharedHelper';
import * as Usertype from '@/generated/User';
import * as attendantTg from '../TypeGraphql/Attendant';
import format from '../Helpers/FormatHelper';
import { HttpCode } from '@/utils/HttpCode';
import { testModel } from '@/server/Models/TestModel';
import { AttendantHelper } from '../Helpers/AttendantHelper';
import { AssignAttendantToTestArgs } from '@/generated/Attendant';
import { AttendantStatus } from '@/generated/Enum';

@Resolver()
export class AttendantResolver extends AttendantHelper {
  @Authorized()
  @Mutation(() => attendantTg.AddAttendantResponse)
  async addAttendant(
    @Ctx() ctx: Usertype.ContextT,
    @Arg('args', () => attendantTg.AddAttendantArgs)
    args: attendantTg.AddAttendantArgs,
    @Arg('testId') testId: string
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
    @Arg('args', (type) => [attendantTg.AddAttendantArgs])
    args: attendantTg.AddAttendantArgs[],
    @Arg('testId') testId: string,
    @Ctx() ctx: Usertype.ContextT
  ): Promise<attendantTg.AddMoreAttendantResponse> {
    try {
      const { req } = ctx;

      const checkTest = await testModel.findOne({
        $and: [{ _id: testId }, { managerId: req.session.userId }],
      });

      if (!checkTest) {
        return errorResponse('You are not allowed to perform this action');
      }

      const checkDuplicateEmail = this.findDuplicateEmail(args);

      if (checkDuplicateEmail) {
        return errorResponse(
          `The following emails are duplicate. ${checkDuplicateEmail}`
        );
      }

      const checkDuplicateEmailFromDb = await attendantModel.findOne({
        $and: [{ testId }, { email: { $in: args.map((item) => item.email) } }],
      });

      if (checkDuplicateEmailFromDb) {
        return errorResponse(
          `Attendant With This Email(${checkDuplicateEmailFromDb.email}) Already Assigned To The Test.`
        );
      }

      const values = args.map((item) => ({ ...item, testId }));

      const add = await attendantModel.insertMany(values);

      const items = add.map((item) => format.getAttendant(item));

      await this.assignAttendantsToTest(
        items.map((item) => ({ attendant: String(item._id) })),
        testId
      );

      return {
        message: 'Saved Successfuly',
        items,
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  private assignAttendantsToTest = async (
    values: AssignAttendantToTestArgs[],
    testId: string
  ) => {
    const findTest = await testModel.findById(testId);

    if (findTest) {
      const storedAttendants = findTest.attendants || [];

      const change = await testModel.updateMany(
        { _id: testId },
        { $set: { attendants: [...storedAttendants, ...values] } }
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
    @Args() args: attendantTg.GetAttendantByTestArgs
  ): Promise<attendantTg.GetAttendantByTestResponse> {
    try {
      const filterQuery = { testId: args.testId };
      const pagination = await generatePagination(
        attendantModel,
        args,
        filterQuery
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
        nextPage: pagination.nextPage,
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
    @Arg('attendantId') attendantId: string
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
}

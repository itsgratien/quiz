import {
  Resolver,
  Mutation,
  Query,
  Authorized,
  Args,
  Ctx,
  UseMiddleware,
  Arg,
} from 'type-graphql';
import { attendantModel } from '../Models/AttendantModel';
import { errorResponse } from '../Helpers/SharedHelper';
import * as Usertype from '@/generated/User';
import * as attendantTg from '../TypeGraphql/Attendant';
import format from '../Helpers/FormatHelper';
import { HttpCode } from '@/utils/HttpCode';
import { testModel } from '@/server/Models/TestModel';
import { AttendantHelper } from '../Helpers/AttendantHelper';

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

      const add = await attendantModel.create(args);
      return {
        message: 'Saved Successfully',
        data: format.getAttendant(add),
      };
    } catch (error: any) {
      return errorResponse(error.message, HttpCode.ServerError);
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

      return {
        message: 'Saved Successfuly',
        items,
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

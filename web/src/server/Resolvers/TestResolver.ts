import { testModel } from '@/server/Models/TestModel';
import { Resolver, Args, Ctx, Mutation, Query, Authorized } from 'type-graphql';
import * as TestTg from '@/server/TypeGraphql/Test';
import * as UserType from '@/generated/User';
import { HttpCode } from '@/utils/HttpCode';
import { errorResponse } from '../Helpers/SharedHelper';
import format from '@/server/Helpers/FormatHelper';
import { attendantModel } from '../Models/AttendantModel';
import { TestStatus } from '@/generated/Enum';
import { AttendantHelper } from '../Helpers/AttendantHelper';

@Resolver()
export class TestResolver extends AttendantHelper {
  @Authorized()
  @Mutation(() => TestTg.AddTestResponse)
  async addTest(
    @Args() args: TestTg.AddTestArgs,
    @Ctx() ctx: UserType.ContextT
  ): Promise<TestTg.AddTestResponse> {
    try {
      const { req } = ctx;
      const add = await testModel.create({
        ...args,
        managerId: req.session.userId,
      });
      return {
        data: format.getTest(add, true),
        message: 'Saved successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Authorized()
  @Mutation(() => TestTg.AddTestResponse)
  async publishTest(
    @Args() args: TestTg.PublishTestArgs,
    @Ctx() ctx: UserType.ContextT
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

      const updateR = await testModel.updateOne(
        { _id: checkTest._id },
        { $set: { status: TestStatus.Published } }
      );

      if (updateR.modifiedCount <= 0) {
        return errorResponse('Unable To Publish Test');
      }

      const getAttendants = await attendantModel
        .find({
          $and: [{ testId: checkTest._id }, { testUri: undefined }],
        })
        .select('_id');

      if (getAttendants && getAttendants.length > 0) {
        // generate unique test uri of each attendant
        for (const attendant of getAttendants) {
          await attendantModel.updateOne(
            { $and: [{ _id: attendant._id }, { testId: checkTest._id }] },
            {
              $set: {
                testUri: this.generateUniqueTestUri(
                  checkTest._id,
                  attendant._id
                ),
              },
            }
          );
        }
      }
      return {
        message: 'Published Successfully',
      };
    } catch (error: any) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

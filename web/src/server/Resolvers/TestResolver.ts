import { testModel } from '@/server/Models/TestModel';
import { Resolver, Args, Ctx, Mutation, Query, Authorized } from 'type-graphql';
import * as TestTg from '@/server/TypeGraphql/Test';
import * as UserType from '@/generated/User';
import { HttpCode } from '@/utils/HttpCode';
import { errorResponse } from '../Helpers/SharedHelper';
import format from '@/server/Helpers/FormatHelper';
import { attendantModel } from '../Models/AttendantModel';
import { TestStatus } from '@/generated/Enum';

@Resolver()
export class TestResolver {
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

      await testModel.updateOne(
        { _id: checkTest._id },
        { $set: { status: TestStatus.Published } }
      );
      return {
        message: 'Published Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

import { testModel } from '@/server/Models/TestModel';
import { Resolver, Args, Ctx, Mutation, Query, Authorized } from 'type-graphql';
import * as TestTg from '@/server/TypeGraphql/Test';
import * as UserType from '@/generated/User';
import { HttpCode } from '@/utils/HttpCode';
import { errorResponse } from '../Helpers/SharedHelper';
import format from '@/server/Helpers/FormatHelper';

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
}

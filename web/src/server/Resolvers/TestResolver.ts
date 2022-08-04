import { testModel, TestDocument, Test } from '@/server/Models/TestModel';
import { Resolver, Args, Ctx, Mutation, Query, Authorized } from 'type-graphql';
import * as TestTg from '@/server/TypeGraphql/Test';
import * as UserType from '@/generated/User';

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
        data: this.handleTestResponse(add, true),
        message: 'Saved successfully'
      };
    } catch (error) {
      return {
        error: 'Something went wrong',
      };
    }
  }

  handleTestResponse(values: TestDocument, allowManagerInfo?: boolean): Test {
    return {
      ...values,
      _id: values._id,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
      subject: values.subject,
      title: values.title,
      description: values.description,
      status: values.status,
      startDate: values.startDate,
      endDate: values.endDate,
      passMark: values.passMark,
      managerId: allowManagerInfo ? values.managerId: undefined,
      questions: values.questions,
      attendants: values.attendants
    };
  }
}

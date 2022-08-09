import { Resolver, Mutation, Query, Args, Ctx, Authorized } from 'type-graphql';
import {
  AddQuestionResponse,
  AddMcQuestionArgs,
} from '@/server/TypeGraphql/Question';
import { questionModel } from '@/server/Models/QuestionModel';
import * as UserType from '@/generated/User';
import { generateSlug } from '@/server/Helpers/SharedHelper';

@Resolver()
export class QuestionResolver {
  @Authorized()
  @Mutation(() => AddQuestionResponse)
  async setupMultipleChoiceQuestion(
    @Args() args: AddMcQuestionArgs,
    @Ctx() ctx: UserType.ContextT
  ): Promise<AddQuestionResponse> {
    try {
      const { req } = ctx;

      const add = await questionModel.create({
        owner: req.session.userId,
        title: args.title,
        description: args.description,
        answers: args.answers,
        choices: args.choices,
        slug: generateSlug(args.title),
      });
      return {
        message: 'Saved Successfully',
        data: { ...add, _id: add.id },
      };
    } catch (error) {
      return {
        error: 'Internal server error',
      };
    }
  }
}

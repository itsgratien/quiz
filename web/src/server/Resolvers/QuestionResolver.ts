import { Resolver, Mutation, Query, Args, Ctx, Authorized } from 'type-graphql';
import {
  AddQuestionResponse,
  AddMcQuestionArgs,
} from '@/server/TypeGraphql/Question';
import { questionModel } from '@/server/Models/QuestionModel';
import * as UserType from '@/generated/User';
import {
  generateSlug,
  generatePagination,
} from '@/server/Helpers/SharedHelper';
import format from '@/server/Helpers/FormatHelper';
import * as questionTg from '@/server/TypeGraphql/Question';

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
        data: format.getQuestion(add),
      };
    } catch (error) {
      return {
        error: 'Internal server error',
      };
    }
  }

  @Authorized()
  @Query(() => questionTg.GetQuestionsResponse)
  async getQuestions(
    @Ctx() ctx: UserType.ContextT,
    @Args() args: questionTg.GetQuestionsArgs
  ) {
    try {
      const userId = ctx.req.session.userId;

      const pagination = await generatePagination(questionModel, args);

      const find = await questionModel
        .find({ owner: userId })
        .limit(args.limit)
        .skip(pagination.offset)
        .populate('owner')
        .sort({ updatedAt: -1 });

      return {
        data: {
          items: find.map((item) => format.getQuestion(item)),
          totalDocs: pagination.totalDocs,
        },
      };
    } catch (error) {
      return {
        error: 'Internal Server Error',
      };
    }
  }
}

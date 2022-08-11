import {
  Resolver,
  Mutation,
  Query,
  Args,
  Ctx,
  Authorized,
  UseMiddleware,
} from 'type-graphql';
import {
  AddQuestionResponse,
  AddMcQuestionArgs,
} from '@/server/TypeGraphql/Question';
import { questionModel, QuestionDocument } from '@/server/Models/QuestionModel';
import * as UserType from '@/generated/User';
import {
  generateSlug,
  generatePagination,
  errorResponse,
} from '@/server/Helpers/SharedHelper';
import format from '@/server/Helpers/FormatHelper';
import * as questionTg from '@/server/TypeGraphql/Question';
import * as questionMiddleware from '@/server/Middlewares/QuestionMiddleware';

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
      return errorResponse();
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
        .limit(pagination.limit)
        .skip(pagination.offset)
        .populate('owner')
        .sort({ updatedAt: -1 });

      return {
        data: {
          items: find.map((item) => format.getQuestion(item)),
          totalDocs: pagination.totalDocs,
          totalPages: pagination.totalPages,
        },
      };
    } catch (error) {
      return errorResponse();
    }
  }

  @Query(() => questionTg.GetQuestionResponse)
  async getQuestion(
    @Args() arg: questionTg.GetQuestionArgs
  ): Promise<questionTg.GetQuestionResponse> {
    try {
      const find = await questionModel.findOne({ slug: arg.id });

      return {
        data: format.getQuestion(find as QuestionDocument, false),
      };
    } catch (error) {
      return errorResponse();
    }
  }

  @Authorized()
  @UseMiddleware(questionMiddleware.verifyQuestionOwner)
  @Mutation(() => AddQuestionResponse)
  async editMcQuestion(
    @Ctx() ctx: UserType.ContextT,
    @Args() args: questionTg.EditMcQArgs
  ): Promise<AddQuestionResponse> {
    try {
      const { userId: owner } = ctx.req.session;

      await questionModel.updateOne(
        { $and: [{ _id: args.id }, { owner }] },
        { $set: { ...args } }
      );

      return {
        message: 'Updated successfully',
      };
    } catch (error) {
      return errorResponse();
    }
  }
}

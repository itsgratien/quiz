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
import { HttpCode } from '@/utils/HttpCode';
import { testModel } from '@/server/Models/TestModel';
import { TestStatus } from '@/generated/Enum';

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
        status: args.assignToTest ? TestStatus.Published : TestStatus.Draft,
      });

      if (args.testId && args.assignToTest) {
        const checkTestOwner = await testModel.findOne({
          $and: [{ _id: args.testId }, { managerId: req.session.userId }],
        });

        if (checkTestOwner) {
          await this.assignQuestionsToTheTest(add._id, checkTestOwner._id);
        }
      }
      return {
        message: 'Saved Successfully',
        data: format.getQuestion(add),
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
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
      return errorResponse(undefined, HttpCode.ServerError);
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
      return errorResponse(undefined, HttpCode.ServerError);
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
        message: 'Updated Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Authorized()
  @UseMiddleware(questionMiddleware.verifyQuestionOwner)
  @Mutation(() => questionTg.AddQuestionResponse)
  async changeQuestionStatus(
    @Ctx() ctx: UserType.ContextT,
    @Args() args: questionTg.EditQuestionStatusArgs
  ): Promise<questionTg.AddQuestionResponse> {
    try {
      const { userId: owner } = ctx.req.session;

      await questionModel.updateOne(
        { $and: [{ _id: args.id }, { owner }] },
        { $set: { status: args.status } }
      );

      return {
        message: 'Updated Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  private assignQuestionsToTheTest = async (
    questionId: string,
    testId: string
  ) => {
    const findTest = await testModel.findById(testId);

    if (findTest) {
      const checkQuestion = await testModel.findOne({
        $and: [{ _id: testId }, { questions: { $in: [questionId] } }],
      });

      if (!checkQuestion) {
        const update = await testModel.updateOne(
          { _id: testId },
          { $push: { questions: questionId } }
        );

        if (update.modifiedCount > 0) {
          return true;
        }
      }
    }

    return false;
  };
}

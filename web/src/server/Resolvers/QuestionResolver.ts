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
import { questionModel } from '@/server/Models/QuestionModel';
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
import mongoose from 'mongoose';

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

      if (args.testId) {
        const findTest = await testModel.findOne({
          $and: [{ _id: args.testId }, { managerId: req.session.userId }],
        });

        if (!findTest) {
          return errorResponse('Test Not Found');
        }
      }

      const add = await questionModel.create({
        owner: req.session.userId,
        title: args.title,
        description: args.description,
        solutions: args.solutions,
        choices: args.choices,
        slug: generateSlug(args.title),
        status: args.assignToTest ? TestStatus.Published : TestStatus.Draft,
        points: args.points,
      });

      if (args.testId && args.assignToTest) {
        const checkTestOwner = await testModel.findOne({
          $and: [{ _id: args.testId }, { managerId: req.session.userId }],
        });

        if (checkTestOwner) {
          await this.assignQuestionsToTheTest(add._id, checkTestOwner._id);
          await this.linkTestToQuestion(add._id, checkTestOwner._id);
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
  ): Promise<questionTg.GetQuestionsResponse> {
    try {
      const userId = ctx.req.session.userId;

      const filter = { owner: userId };

      const pagination = await generatePagination(questionModel, args, filter);

      const find = await questionModel
        .find(filter)
        .limit(pagination.limit)
        .skip(pagination.offset)
        .populate('owner')
        .sort({ updatedAt: -1 });

      return {
        items: find.map((item) => format.getQuestion(item)),
        totalPages: pagination.totalPages,
        totalDocs: pagination.totalDocs,
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Query(() => questionTg.GetQuestionResponse)
  async getQuestion(
    @Args() arg: questionTg.GetQuestionArgs,
    @Ctx() ctx: UserType.ContextT
  ): Promise<questionTg.GetQuestionResponse> {
    try {
      const { req } = ctx;

      const findBySlug = await questionModel.findOne({ slug: arg.id });

      let find = findBySlug;

      if (!findBySlug) {
        find = await questionModel.findById(arg.id);
      }

      if (!find) {
        return errorResponse('Question Not Found');
      }

      return {
        data: req.session.userId
          ? format.getQuestion(find, false)
          : {
              ...format.getQuestion(find, false),
              solutions: undefined,
            },
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
        $and: [
          { _id: testId },
          { questions: { $in: [{ question: questionId }] } },
        ],
      });

      if (!checkQuestion) {
        const update = await testModel.updateOne(
          { _id: testId },
          { $push: { questions: { question: questionId } } }
        );

        if (update.modifiedCount > 0) {
          return true;
        }
      }
    }

    return false;
  };

  private linkTestToQuestion = async (questionId: string, testId: string) => {
    const findQuestion = await questionModel.findById(questionId);

    if (findQuestion) {
      const isNotIncluded = findQuestion.tests
        ? findQuestion.tests.find((item) => item.test === testId)
          ? false
          : true
        : true;

      if (isNotIncluded) {
        const updateQ = await questionModel.updateOne(
          { _id: questionId },
          { $push: { tests: { test: testId } } }
        );

        if (updateQ.modifiedCount > 0) {
          return true;
        }
      }
    }
    return false;
  };

  @Authorized()
  @Mutation(() => questionTg.AddQuestionToTestResponse)
  async addQuestionToTest(
    @Args() args: questionTg.AddQuestionToTestArgs,
    @Ctx() ctx: UserType.ContextT
  ): Promise<questionTg.AddQuestionToTestResponse> {
    try {
      const { question, test } = args;

      const { req } = ctx;

      const findQuestion = await questionModel.findOne({
        $and: [{ _id: question }, { owner: req.session.userId }],
      });

      if (!findQuestion) {
        return errorResponse('Question Not Found');
      }

      const findTest = await testModel.findById(test);

      if (!findTest) {
        return errorResponse('Test Not Found');
      }

      const assign = await this.assignQuestionsToTheTest(
        findQuestion._id,
        findTest._id
      );

      if (!assign) {
        return errorResponse('Unable to assign question to a test');
      }

      const link = await this.linkTestToQuestion(
        findQuestion._id,
        findTest._id
      );

      if (!link) {
        return errorResponse('Unable to assign question to a test');
      }

      return {
        message: 'Saved Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Query(() => questionTg.GetQuestionAssignedToTestResponse)
  async getQuestionAssignedToTest(
    @Args() args: questionTg.GetQuestionAssignedToTestArgs,
    @Ctx() context: UserType.ContextT
  ): Promise<questionTg.GetQuestionAssignedToTestResponse> {
    try {
      const { req } = context;

      const filterQuery = {
        'tests.test': new mongoose.Types.ObjectId(args.testId),
      };

      const pagination = await generatePagination(
        questionModel,
        args,
        filterQuery
      );

      const find = await questionModel
        .find(filterQuery)
        .limit(pagination.limit)
        .skip(pagination.offset)
        .sort({ updatedAt: -1 });

      return {
        items: find.map((item) => {
          if (req.session && req.session.userId) {
            return format.getQuestion(item);
          } else {
            return {
              ...format.getQuestion(item),
              solutions: undefined,
            };
          }
        }),
        totalPages: pagination.totalPages,
        totalDocs: pagination.totalDocs,
        testId: args.testId,
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

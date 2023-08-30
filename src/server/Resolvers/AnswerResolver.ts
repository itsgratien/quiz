import { Resolver, Mutation, UseMiddleware, Args, Query } from 'type-graphql';
import { answerModel } from '@/server/Models/AnswerModel';
import { resultModel } from '@/server/Models/ResultModel';
import { questionModel } from '@/server/Models/QuestionModel';
import { errorResponse } from '@/server/Helpers/SharedHelper';
import { HttpCode } from '@/utils/HttpCode';
import * as AnswerTg from '@/server/TypeGraphql/Answer';
import * as AnswerMiddleware from '@/server/Middlewares/AnswerMiddleware';
import { AnswerHelper } from '@/server/Helpers/AnswerHelper';
import { attendantModel } from '@/server/Models/AttendantModel';
import { AttendantStatus } from '@/generated/Enum';
import { verifyTestUri } from '@/server/Middlewares/TestMiddleware';
import format from '@/server/Helpers/FormatHelper';
import mongoose from 'mongoose';
import { cryptr } from '@/server/Helpers/AttendantHelper';

@Resolver()
export class AnswerResolver extends AnswerHelper {
  @UseMiddleware([verifyTestUri, AnswerMiddleware.verifyArgs])
  @Mutation(() => AnswerTg.AnswerResponse)
  async answerMcQuestion(
    @Args() args: AnswerTg.AnswerMcArgs,
  ): Promise<AnswerTg.AnswerResponse> {
    try {
      const getQuestion = await questionModel.findById(args.question);

      const testId = cryptr.decrypt(args.test);

      const attendantId = cryptr.decrypt(args.attendant);

      if (!getQuestion) {
        return errorResponse('Question Not Found');
      }

      const grade = this.getMCQGrade(
        getQuestion.solutions as string[],
        args.answers,
        getQuestion.points,
      );

      const getQuestionLinkedToTest = await questionModel.find({
        'tests.test': new mongoose.Types.ObjectId(testId),
      });

      await answerModel.create({
        grade,
        question: getQuestion._id,
        test: testId,
        attendant: attendantId,
        answers: args.answers,
      });

      const getAnswers = await answerModel.find({
        $and: [{ test: testId }, { attendant: attendantId }],
      });

      const countAnsweredQuestion = getAnswers.length;

      const countQuestionLinkedToTest = getQuestionLinkedToTest.length;

      if (countQuestionLinkedToTest === countAnsweredQuestion) {
        const totalGrade = getAnswers.reduce(
          (prev, curr) => Number(prev) + Number(curr.grade),
          0,
        );

        const totalPoints = getQuestionLinkedToTest.reduce(
          (prev, curr) => Number(prev) + Number(curr.points),
          0,
        );

        const overralGrade = (totalGrade * 100) / totalPoints;

        await resultModel.create({
          overralgrade: overralGrade.toFixed(),
          answers: getAnswers.length
            ? getAnswers.map((item) => ({ answer: item._id }))
            : [],
          attendant: attendantId,
          testId,
        });
      }

      await attendantModel.updateOne(
        { _id: attendantId },
        {
          $set: {
            status:
              countQuestionLinkedToTest === countAnsweredQuestion
                ? AttendantStatus.Completed
                : AttendantStatus.InProgress,
          },
        },
      );
      return {
        message: 'Saved Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }

  @Query(() => AnswerTg.GetAnswerResponse)
  async getAnswer(
    @Args() args: AnswerTg.GetAnswerArgs,
  ): Promise<AnswerTg.GetAnswerResponse> {
    try {
      const findAnswer = await answerModel.findOne({
        $and: [
          { question: args.question },
          { testId: args.test },
          { attendant: args.attendant },
        ],
      });

      if (!findAnswer) {
        return errorResponse('Answer Not Found');
      }

      return {
        data: format.getAnswer(findAnswer),
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

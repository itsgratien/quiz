import { Resolver, Mutation, UseMiddleware, Args } from 'type-graphql';
import { answerModel } from '@/server/Models/AnswerModel';
import { errorResponse, decryptFunc } from '@/server/Helpers/SharedHelper';
import { HttpCode } from '@/utils/HttpCode';
import * as AnswerTg from '@/server/TypeGraphql/Answer';
import * as AnswerMiddleware from '@/server/Middlewares/AnswerMiddleware';
import { questionModel } from '@/server/Models/QuestionModel';
import { AnswerHelper } from '@/server/Helpers/AnswerHelper';
import { attendantModel } from '@/server/Models/AttendantModel';
import { AttendantStatus } from '@/generated/Enum';
import { verifyTestUri } from '@/server/Middlewares/TestMiddleware';

@Resolver()
export class AnswerResolver extends AnswerHelper {
  @UseMiddleware([verifyTestUri, AnswerMiddleware.verifyArgs])
  @Mutation(() => AnswerTg.AnswerResponse)
  async answerMcQuestion(
    @Args() args: AnswerTg.AnswerMcArgs
  ): Promise<AnswerTg.AnswerResponse> {
    try {
      const getQuestion = await questionModel.findById(args.question);

      const testId = decryptFunc(args.test);

      const attendantId = decryptFunc(args.attendant);

      if (!getQuestion) {
        return errorResponse('Question Not Found');
      }

      const grade = this.getMCQGrade(
        getQuestion.solutions as string[],
        args.answers,
        getQuestion.points
      );

      await answerModel.create({
        grade,
        question: getQuestion._id,
        testId,
        attendant: attendantId,
        answers: args.answers,
      });

      await attendantModel.updateOne(
        { _id: attendantId },
        { $set: { status: AttendantStatus.InProgress } }
      );
      return {
        message: 'Saved Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

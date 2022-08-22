import {
  Resolver,
  Mutation,
  UseMiddleware,
  Args,
  Arg,
} from 'type-graphql';
import { answerModel } from '@/server/Models/AnswerModel';
import { errorResponse, decryptFunc } from '@/server/Helpers/SharedHelper';
import { HttpCode } from '@/utils/HttpCode';
import * as AnswerTg from '@/server/TypeGraphql/Answer';
import * as AnswerMiddleware from '@/server/Middlewares/AnswerMiddleware';
import { questionModel } from '@/server/Models/QuestionModel';
import { AnswerHelper } from '@/server/Helpers/AnswerHelper';

@Resolver()
export class AnswerResolver extends AnswerHelper {
  @UseMiddleware(AnswerMiddleware.verifyArgs)
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
        getQuestion.answers as string[],
        args.answers
      );

    //   await answerModel.create({
    //     grade,
    //     question: getQuestion._id,
    //     testId,
    //     attendant: attendantId,
    //     answers: args.answers,
    //   });
      return {
        message: 'Saved Successfully',
      };
    } catch (error: any) {
      return errorResponse(error.message, HttpCode.ServerError);
    }
  }
}

import {
  Resolver,
  Mutation,
  UseMiddleware,
  Authorized,
  Args,
  Arg,
} from 'type-graphql';
import { answerModel } from '@/server/Models/AnswerModel';
import { errorResponse } from '@/server/Helpers/SharedHelper';
import { HttpCode } from '@/utils/HttpCode';
import * as AnswerTg from '@/server/TypeGraphql/Answer';
import * as AnswerMiddleware from '@/server/Middlewares/AnswerMiddleware';

@Resolver()
export class AnswerResolver {
  @Authorized()
  @UseMiddleware(AnswerMiddleware.verifyArgs)
  @Mutation(() => AnswerTg.AnswerResponse)
  async answerMcQuestion(
    @Args() args: AnswerTg.AnswerMcArgs
  ): Promise<AnswerTg.AnswerResponse> {
    try {
      return {
        message: 'Saved Successfully',
      };
    } catch (error: any) {
      return errorResponse(error.message, HttpCode.ServerError);
    }
  }
}

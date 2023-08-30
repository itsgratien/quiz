import { HttpCode } from '@/utils/HttpCode';
import { Query, Authorized, Resolver, Args } from 'type-graphql';
import { errorResponse } from '../Helpers/SharedHelper';
import {
  GetOverralGradeResponse,
  GetOverralGradeArgs,
} from '@/server/TypeGraphql/Result';
import { resultModel } from '@/server/Models/ResultModel';

@Resolver()
export class ResultResolver {
  @Authorized()
  @Query(() => GetOverralGradeResponse)
  async getOverralGrade(
    @Args() args: GetOverralGradeArgs
  ): Promise<GetOverralGradeResponse> {
    try {
      const find = await resultModel.findOne({
        $and: [{ attendant: args.attendant }, { test: args.test }],
      });

      if (!find) {
        return errorResponse('Not Found');
      }

      return {
        overralgrade: find.overralgrade,
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

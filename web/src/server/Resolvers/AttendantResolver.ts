import { Resolver, Mutation, Query, Authorized, Args, Ctx } from 'type-graphql';
import { attendantModel } from '../Models/AttendantModel';
import { errorResponse } from '../Helpers/SharedHelper';
import * as Usertype from '@/generated/User';
import * as attendantTg from '../TypeGraphql/Attendant';
import format from '../Helpers/FormatHelper';
import { HttpCode } from '@/utils/HttpCode';

@Resolver()
export class AttendantResolver {
  @Authorized()
  @Mutation(() => attendantTg.AddAttendantResponse)
  async addAttendant(
    @Ctx() ctx: Usertype.ContextT,
    @Args() args: attendantTg.AddAttendantArgs
  ): Promise<attendantTg.AddAttendantResponse> {
    try {
      const add = await attendantModel.create(args);
      return {
        message: 'Saved Successfully',
        data: format.getAttendant(add),
      };
    } catch (error: any) {
      return errorResponse(error.message, HttpCode.ServerError);
    }
  }
}

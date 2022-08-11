import { Resolver, Mutation, Query, Authorized, Args, Ctx } from 'type-graphql';
import { Attendant } from '../Models/AttendantModel';
import { errorResponse } from '../Helpers/SharedHelper';
import * as Usertype from '@/generated/User';

@Resolver()
export class AttendantResolver {
  @Authorized()
  @Mutation()
  async addAttendant(@Ctx() ctx: Usertype.ContextT) {
    try {
    } catch (error) {
      return errorResponse();
    }
  }
}

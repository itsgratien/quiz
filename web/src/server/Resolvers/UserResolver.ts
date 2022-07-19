import 'reflect-metadata';
import {
  Resolver,
  Query,
  Ctx,
  Authorized,
} from 'type-graphql';
import userModel from '@/server/Models/UserModel';
import * as UserTypes from '@/generated/User';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => UserTypes.UserT)
  async getUser(
    @Ctx() ctx: UserTypes.ContextT
  ): Promise<UserTypes.UserT | null> {
    const { req } = ctx;

    const find = await userModel.findOne({
      email: req.user.email,
    });

    if (find) {
      return {
        email: find.email,
        _id: find._id,
        names: find.names
      };
    }
    return null;
  }
}

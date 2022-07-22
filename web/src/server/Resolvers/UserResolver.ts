import 'reflect-metadata';
import { Resolver, Query, Ctx, Authorized, Mutation, Args } from 'type-graphql';
import userModel from '@/server/Models/UserModel';
import * as UserTg from '@/server/TypeGraphql/User';
import * UserT from '@/generated/User';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => UserTg.UserT)
  async getUser(
    @Ctx() ctx: UserT.ContextT
  ): Promise<UserTg.UserT | null> {
    const { req } = ctx;

    const find = await userModel.findOne({
      email: req.user.email,
    });

    if (find) {
      return {
        email: find.email,
        _id: find._id,
        names: find.names,
      };
    }
    return null;
  }

  @Mutation(() => UserTg.AuthenticateResponseT)
  async authenticate(
    @Args() args: UserTg.AuthenticateT
  ): Promise<UserTg.AuthenticateResponseT> {
    return {
      message: 'welcome',
    };
  }
}

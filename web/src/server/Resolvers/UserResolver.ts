import 'reflect-metadata';
import { Resolver, Query, Ctx, Authorized, Mutation, Args } from 'type-graphql';
import userModel from '@/server/Models/UserModel';
import * as UserTypes from '@/generated/User';
import * as AuthT from '@/generated/Auth';

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
        names: find.names,
      };
    }
    return null;
  }

  @Mutation(() => AuthT.AuthenticateResponseT)
  async authenticate(
    @Args() args: AuthT.AuthenticateT
  ): Promise<AuthT.AuthenticateResponseT> {
    return {
      message: 'welcome',
    };
  }
}

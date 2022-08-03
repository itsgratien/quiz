import 'reflect-metadata';
import { Resolver, Query, Ctx, Authorized, Mutation, Args } from 'type-graphql';
import userModel from '@/server/Models/UserModel';
import * as UserTg from '@/server/TypeGraphql/User';
import * as UserType from '@/generated/User';
import { firebaseAdmin } from '@/utils/FirebaseAdmin';
import { GraphQLYogaError } from '@graphql-yoga/node';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => UserTg.UserT)
  async getUser(@Ctx() ctx: UserType.ContextT): Promise<UserTg.UserT | null> {
    const { req } = ctx;

    const find = await userModel.findById(req.session.userId);

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
    @Args() args: UserTg.AuthenticateT,
    @Ctx() ctx: UserType.ContextT
  ): Promise<UserTg.AuthenticateResponseT> {
    try {
      const { req } = ctx;
      const { idToken } = args;

      const auth = await firebaseAdmin.auth().verifyIdToken(idToken);

      const findUser = await userModel.findOne({ email: auth.email });

      if (!findUser) {
        await userModel.create({ email: auth.email });
      }

      req.session.userId = String(findUser?._id);

      return {
        message: 'Authenticated Successfully',
      };
    } catch (error: any) {
      console.log('error', error);
      return new GraphQLYogaError('Unable to authenticate');
    }
  }
}

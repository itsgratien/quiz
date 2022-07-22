import 'reflect-metadata';
import { Resolver, Query, Ctx, Authorized, Mutation, Args } from 'type-graphql';
import userModel from '@/server/Models/UserModel';
import * as UserTg from '@/server/TypeGraphql/User';
import * as UserType from '@/generated/User';
import cookie from 'cookie';
import { firebaseAdmin } from '@/utils/FirebaseAdmin';
import { GraphQLYogaError } from '@graphql-yoga/node';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => UserTg.UserT)
  async getUser(@Ctx() ctx: UserType.ContextT): Promise<UserTg.UserT | null> {
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
    @Args() args: UserTg.AuthenticateT,
    @Ctx() ctx: UserType.ContextT
  ): Promise<UserTg.AuthenticateResponseT> {
    try {
      const { res } = ctx;
      const { idToken } = args;

      const auth = await firebaseAdmin.auth().verifyIdToken(idToken);

      const findUser = await userModel.findOne({ email: auth.email });

      if (!findUser) {
        await userModel.create({ email: auth.email });
      }

      res.setHeader('Set-Cookie', [
        cookie.serialize('idToken', idToken, {
          maxAge: 1000 * 10 * 60,
          httpOnly: true,
        }),
      ]);

      return {
        message: 'Authenticated Successfully',
      };
    } catch (error: any) {
      return new GraphQLYogaError('Unable to authenticate');
    }
  }
}

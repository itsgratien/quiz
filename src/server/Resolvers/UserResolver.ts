import 'reflect-metadata';
import { Resolver, Query, Ctx, Authorized, Mutation, Args } from 'type-graphql';
import userModel from '@/server/Models/UserModel';
import * as UserTg from '@/server/TypeGraphql/User';
import * as UserType from '@/generated/User';
import { firebaseAdmin } from '@/utils/FirebaseAdmin';
import { GraphQLYogaError } from '@graphql-yoga/node';
import { errorResponse } from '../Helpers/SharedHelper';
import { HttpCode } from '@/utils/HttpCode';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => UserTg.GetUserResponse)
  async getUser(
    @Ctx() ctx: UserType.ContextT,
  ): Promise<UserTg.GetUserResponse | null> {
    const { req } = ctx;

    const find = await userModel.findById(req.session.userId);

    if (find) {
      return {
        data: {
          ...find,
          email: find.email,
          names: find.names,
          _id: String(find._id),
          createdAt: find.createdAt,
          updatedAt: find.updatedAt,
        },
      };
    }
    return null;
  }

  @Mutation(() => UserTg.AuthenticateResponse)
  async authenticate(
    @Args() args: UserTg.Authenticate,
    @Ctx() ctx: UserType.ContextT,
  ): Promise<UserTg.AuthenticateResponse> {
    try {
      const { req } = ctx;
      const { idToken } = args;

      const auth = await firebaseAdmin.auth().verifyIdToken(idToken);

      const findUser = await userModel.findOne({ email: auth.email });

      if (!findUser) {
        await userModel.create({ email: auth.email });
      }

      req.session.userId = String(findUser?.id);

      return {
        message: 'Authenticated Successfully',
      };
    } catch (error: any) {
      return new GraphQLYogaError('Unable to authenticate');
    }
  }

  @Authorized()
  @Mutation(() => UserTg.GetUserResponse)
  async logout(@Ctx() ctx: UserType.ContextT): Promise<UserTg.GetUserResponse> {
    try {
      const { req } = ctx;

      req.session.destroy();

      return {
        message: 'Logged Out Successfully',
      };
    } catch (error) {
      return errorResponse(undefined, HttpCode.ServerError);
    }
  }
}

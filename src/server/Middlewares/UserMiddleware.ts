import { MiddlewareFn, AuthChecker } from 'type-graphql';
import { ContextT } from '@/generated/User';
import userModel from '@/server/Models/UserModel';

export const customAuthChecker: AuthChecker<ContextT> = async ({ context }) => {
  const { req } = context;

  if (req.session.userId) {
    const findUser = await userModel.findById(req.session.userId);

    if (findUser) {
      return true;
    }
  }
  return false;
};

export const verifyUserRole: MiddlewareFn<ContextT> = async (
  { args },
  next
) => {};

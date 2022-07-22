import { MiddlewareFn, AuthChecker } from 'type-graphql';
import { ContextT } from '@/generated/User';
import { firebaseAdmin } from '@/utils/FirebaseAdmin';
import userModel from '@/server/Models/UserModel';
import cookie from 'cookie';

export const customAuthChecker: AuthChecker<ContextT> = async ({ context }) => {
  const { req } = context;

  const getCookies = cookie.parse(req.headers.cookie || '');

  if (getCookies && getCookies.idToken) {
    const verifyIdToken = await firebaseAdmin
      .auth()
      .verifyIdToken(getCookies.idToken);

    if (verifyIdToken) {
      const findUser = await userModel.findOne({ email: verifyIdToken.email });

      if (findUser) {
        req.user = findUser;
        return true;
      }
    }
  }
  return false;
};

import { MiddlewareFn, AuthChecker } from 'type-graphql';
import { ContextT } from '@/generated/User';
import { firebaseAdmin } from '@/utils/FirebaseAdmin';
import userModel from '@/server/Models/UserModel';

export const customAuthChecker: AuthChecker<ContextT> = async ({ context }) => {
  const { req } = context;

  const idToken = req.headers.authorization;

  if (idToken) {
    const verifyIdToken = await firebaseAdmin.auth().verifyIdToken(idToken);

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

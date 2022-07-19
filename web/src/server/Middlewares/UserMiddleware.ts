import { MiddlewareFn, AuthChecker } from 'type-graphql';
import { ContextT } from '@/generated/User';
import { firebaseAdmin } from '@/utils/FirebaseAdmin';
import userModel from '@/server/Models/UserModel';

export const customAuthChecker: AuthChecker<ContextT> = async ({ context }) => {
  const { req } = context;
  if (req.headers && req.headers['authorization']) {
    const idToken = req.headers['authorization'];
    const verifyIdToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    if (verifyIdToken) {
      const findUser = await userModel.findOne({ email: verifyIdToken.email });
      if (!findUser) {
        const newUser = await userModel.create({ email: verifyIdToken.email });
        req.user = newUser;
      }
      req.user = findUser;
      return true;
    }
  }
  return false;
};

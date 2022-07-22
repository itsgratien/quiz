import React from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthProviderPropsT } from '@/generated/User';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import nookies from 'nookies';

export const AuthProvider = ({ children }: AuthProviderPropsT) => {
  const [isAuth, setIsAuth] = React.useState<boolean>();

  const auth = getAuth();

  React.useEffect(() => {
    onIdTokenChanged(
      auth,
      async (user) => {
        if (user) {
          setIsAuth(true);
          const idToken = await user.getIdToken();
          nookies.set(undefined, 'token', idToken, { path: '/' });
        }
      },
      () => {
        setIsAuth(false);
        nookies.set(undefined, 'token', '', { path: '/' });
      }
    );
  }, []);

  React.useEffect(() => {
    const handler = setInterval(async () => {
      const user = auth.currentUser;
      if (user && (await user.getIdToken(true))) {
        const idToken = await user.getIdToken();
        nookies.set(undefined, 'token', idToken, { path: '/' });
        setIsAuth(true);
      }
    }, 1000 * 10 * 60);

    return () => clearInterval(handler);
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

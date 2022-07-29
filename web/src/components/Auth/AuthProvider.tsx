import React from 'react';
import { getAuth } from 'firebase/auth';
import { ApolloProvider } from '@apollo/client';
import apollo from '@/utils/ApolloClient';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [idToken, setIdToken] = React.useState<string>();
  const auth = getAuth();

  React.useEffect(() => {
    const getIdToken = async () => {
      const get = await auth.currentUser?.getIdToken();
      setIdToken(get);
    };
    getIdToken();
  }, []);

  return <ApolloProvider client={apollo(idToken)}>{children}</ApolloProvider>;
};

export default AuthProvider;

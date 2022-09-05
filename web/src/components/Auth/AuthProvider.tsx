import React from 'react';
import { ApolloProvider } from '@apollo/client';
import apollo from '@/utils/ApolloClient';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={apollo()}>{children}</ApolloProvider>;
};

export default AuthProvider;

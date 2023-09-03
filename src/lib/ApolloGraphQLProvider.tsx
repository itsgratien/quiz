'use client';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import apollo from '@/utils/ApolloClient';

const ApolloGraphQLProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={apollo()}>{children}</ApolloProvider>;
};

export default ApolloGraphQLProvider;

'use client';
import '@/utils/Firebase';
import React from 'react';
import ApolloGraphQLProvider from './ApolloGraphQLProvider';
import AntdProvider from './AntdProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ApolloGraphQLProvider>
      <AntdProvider>{children}</AntdProvider>
    </ApolloGraphQLProvider>
  );
};
export default AppProvider;

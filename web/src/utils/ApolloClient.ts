import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { NextPageContext, GetServerSidePropsContext } from 'next';

const handleCookieFunc = (
  ctx?: NextPageContext | GetServerSidePropsContext
) => {
  if (typeof window === 'undefined' && ctx) {
    const { req } = ctx;

    if (req && req.headers && req.headers.cookie) {
      return req.headers.cookie;
    }
  }

  return '';
};

const client = (ctx?: NextPageContext | GetServerSidePropsContext) =>
  new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
      cookie: handleCookieFunc(ctx),
    },
  });

export default client;

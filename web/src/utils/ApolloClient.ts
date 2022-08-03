import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { NextPageContext } from 'next';

const handleCookieFunc = (ctx?: NextPageContext) => {
  if (typeof window === 'undefined' && ctx) {
    const { req } = ctx;

    if (req && req.headers && req.headers.cookie) {
      return req.headers.cookie;
    }
  }

  return '';
};

const client = (ctx?: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
      cookie: handleCookieFunc(ctx),
    },
  });

export default client;

import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { NextPageContext } from 'next';

const handleContext = (ctx?: NextPageContext) => {
  if (ctx) {
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
      cookie: typeof window === 'undefined' ? handleContext(ctx) : '',
    },
  });

export default client;

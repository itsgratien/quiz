import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { NextPageContext, GetServerSidePropsContext } from 'next';
import { GetQuestionAssignedToTestResponse } from '@/generated/graphql';

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
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getQuestionAssignedToTest: {
              keyArgs: false,
              merge(
                existing: GetQuestionAssignedToTestResponse,
                incoming: GetQuestionAssignedToTestResponse
              ) {
                if (!existing) {
                  return incoming;
                }
                return {
                  ...incoming,
                  items: existing.items && [
                    ...existing.items,
                    ...incoming.items,
                  ],
                };
              },
            },
          },
        },
      },
    }),
    credentials: 'include',
    headers: {
      cookie: handleCookieFunc(ctx),
    },
  });

export default client;

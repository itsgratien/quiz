import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { NextPageContext, GetServerSidePropsContext } from 'next';
import {
  GetQuestionAssignedToTestResponse,
  GetAttendantByTestResponse,
} from '@/generated/graphql';

const handleCookieFunc = (
  ctx?: NextPageContext | GetServerSidePropsContext
) => {
  if (typeof window === 'undefined' && ctx) {
    const { req } = ctx;

    if (req?.headers && req.headers.cookie) {
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
                incoming: GetQuestionAssignedToTestResponse,
                options: any
              ) {
                const { args } = options;
                if (incoming.testId === args.testId) {
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
                }
              },
              read: (
                existing: GetQuestionAssignedToTestResponse,
                options: any
              ) => {
                const { args } = options;

                if (existing && args.testId === existing.testId) {
                  return existing;
                }
              },
            },
            getAttendantByTest: {
              keyArgs: false,
              merge: (
                existing: GetAttendantByTestResponse,
                incoming: GetAttendantByTestResponse
              ) => {
                if (!existing) {
                  return incoming;
                } else {
                  return {
                    ...incoming,
                    items: [...existing.items, ...incoming.items],
                  };
                }
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

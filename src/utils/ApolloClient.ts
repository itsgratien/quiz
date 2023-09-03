import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { NextPageContext, GetServerSidePropsContext } from 'next';
import {
  GetQuestionAssignedToTestResponse,
  GetAttendantByTestResponse,
} from '@/generated/graphql';
import type { NextRequest } from 'next/server';

const handleCookieFunc = (
  ctx?: NextPageContext | GetServerSidePropsContext | NextRequest,
  use?: 'middleware',
) => {
  if (!use && typeof window === 'undefined' && ctx) {
    const { req } = ctx as NextPageContext | GetServerSidePropsContext;

    if (req?.headers && req.headers.cookie) {
      return req.headers.cookie;
    }
  }

  if (use) {
    const req = ctx as NextRequest;

    if (req.headers) {
      const cookie = req.headers.get('cookie');
      return cookie || '';
    }
  }

  return '';
};

const client = (
  ctx?: NextPageContext | GetServerSidePropsContext,
  use?: 'middleware',
) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return new ApolloClient({
    uri: baseUrl + '/api/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getQuestionAssignedToTest: {
              keyArgs: false,
              merge(
                existing: GetQuestionAssignedToTestResponse,
                incoming: GetQuestionAssignedToTestResponse,
                options: any,
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
                options: any,
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
                incoming: GetAttendantByTestResponse,
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
      cookie: handleCookieFunc(ctx, use),
    },
  });
};

export default client;

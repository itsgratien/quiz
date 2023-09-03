import type { NextRequest } from 'next/server';
import apollo from './ApolloClient';
import { GetUserDocument, GetUserQuery } from '@/generated/graphql';
import { GetServerSidePropsContext } from 'next';

export const isAuth = async (
  req: NextRequest | GetServerSidePropsContext,
  use?: 'middleware',
) => {
  try {
    const find = await apollo(req, use).query<GetUserQuery>({
      query: GetUserDocument,
    });

    return find?.data?.getUser?.data ?? undefined;
  } catch (error: any) {
    return undefined;
  }
};

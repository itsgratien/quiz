import type { GetServerSidePropsContext } from 'next';
import apollo from './ApolloClient';
import { GetUserDocument, GetUserQuery } from '@/generated/graphql';

export const withAuth = async (
  context: GetServerSidePropsContext,
  callback: (user?: any) => void
) => {
  const defaultRedirectObject = {
    redirect: {
      destination: '/auth',
      permenent: false,
    },
  };
  try {
    const find = await apollo(context as any).query<GetUserQuery>({
      query: GetUserDocument,
    });

    if (!find.data || !find.data.getUser || !find.data.getUser.data) {
      return defaultRedirectObject;
    }

    return callback(find.data.getUser.data);
  } catch (error) {
    return defaultRedirectObject;
  }
};

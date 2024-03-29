import type { GetServerSidePropsContext } from 'next';
import apollo from './ApolloClient';
import { GetUserDocument, GetUserQuery, User } from '@/generated/graphql';

export const withAuth = async (
  context: GetServerSidePropsContext,
  callback: (user?: User) => void,
) => {
  const defaultRedirectObject = {
    redirect: {
      destination: '/',
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

export const withUnAuth = async (
  context: GetServerSidePropsContext,
  callback: (isUnAuthorized: boolean) => void,
) => {
  const defaultRedirectObject = {
    redirect: {
      destination: '/m/quiz',
      permenent: false,
    },
  };
  try {
    const find = await apollo(context as any).query<GetUserQuery>({
      query: GetUserDocument,
    });

    if (!find.data || !find.data.getUser || !find.data.getUser.data) {
      return callback(true);
    }

    return defaultRedirectObject;
  } catch (error) {
    return callback(true);
  }
};

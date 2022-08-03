import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import apollo from './ApolloClient';
import * as UserTypes from '@/generated/User';

export const withAuth = async (
  context: GetServerSidePropsContext,
  callback: any
) => {
  const defaultRedirectObject = {
    redirect: {
      destination: '/auth',
      permenent: false,
    },
  };
  try {
    const { req } = context;
    const idToken = req.cookies.idToken;

    if (!idToken) {
      return defaultRedirectObject;
    }

    return callback();
  } catch (error) {
    return defaultRedirectObject;
  }
};

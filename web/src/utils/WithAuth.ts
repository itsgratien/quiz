import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import apollo from './ApolloClient';
import * as UserTypes from '@/generated/User';

export const withAuth = async (
  ctx: GetServerSidePropsContext,
  callback: any
) => {
  const defaultRedirectObject = {
    redirect: {
      destination: '/auth',
      permenent: false,
    },
  };
  try {
    const { req, res } = ctx;

    if (!req.headers.cookie) {
      return defaultRedirectObject;
    }

    const getCookies = cookie.parse(req.headers.cookie as string);

    if (!getCookies || !getCookies.idToken) return defaultRedirectObject;

    await apollo.mutate<UserTypes.AuthenticateResponseT>({
      mutation: UserTypes.AUTHENTICATE_MUTATION,
      variables: { idToken: getCookies.idToken },
    });

    return callback();
  } catch (error) {
    return defaultRedirectObject;
  }
};

export const withoutAuth = async (
  context: GetServerSidePropsContext,
  callback: any
) => {
  const defaultRedirectObject = {
    redirect: {
      destination: '/m/quiz',
      permanent: false,
    },
  };
  try {
    const { req } = context;
    if (!req.headers.cookie) {
      return callback();
    }

    const getCookies = cookie.parse(req.headers.cookie as string);

    if (!getCookies || !getCookies.idToken) return callback();

    await apollo.mutate<UserTypes.AuthenticateResponseT>({
      mutation: UserTypes.AUTHENTICATE_MUTATION,
      variables: { idToken: getCookies.idToken },
    });

    return defaultRedirectObject;
  } catch (error) {
    return callback();
  }
};

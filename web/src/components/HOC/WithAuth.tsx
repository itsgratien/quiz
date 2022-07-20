import type { GetServerSidePropsContext, GetServerSideProps } from 'next';
import nookies from 'nookies';

export const withAuth = async (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    return gssp(ctx);
  };
};

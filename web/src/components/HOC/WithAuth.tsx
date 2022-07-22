import type { GetServerSidePropsContext, GetServerSideProps } from 'next';

export const withAuth = async (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    return gssp(ctx);
  };
};

import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { QuizPageProps } from '@/generated/Quiz';
import { User } from '@/generated/graphql';
import { isAuth } from '@/utils/IsAuth';
import Quizes from '@/components/Quiz';

const Quiz: NextPage<QuizPageProps> = ({ me }) => {
  return (
    <>
      <Head>
        <title>Quizzes</title>
      </Head>
      <Layout showSetupButton>
        <Quizes me={me} />
      </Layout>
    </>
  );
};

export default Quiz;

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<{ props: { me?: User } }> => {
  try {
    const user = await isAuth(ctx.req.headers as any);

    return {
      props: {
        me: user,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

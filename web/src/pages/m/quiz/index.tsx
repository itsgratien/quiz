import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import style from 'src/styles/Quiz.module.scss';
import QuizItem from '@/components/Quiz/QuizItem/QuizItem';
import { withAuth } from '@/utils/WithAuth';
import { QuizPageProps } from '@/generated/Quiz';
import { Icon } from '@iconify/react';
import classname from 'classnames';
import quiz from '@/mocks/Quiz';

const Quiz: NextPage<QuizPageProps> = ({ me }) => {
  return (
    <>
      <Head>
        <title>Quizzes</title>
      </Head>
      <Layout>
        <div className={style.quiz}>
          {me && (
            <div className={classname('relative', style.greeting)}>
              <span className="font-bold">Hello,</span>
              <span className="flex items-center">
                <Icon icon="bx:user" fontSize={24} />
                <span
                  className="font-bold ml-1 mt-1"
                  style={{ fontSize: '14px' }}
                >
                  {me.email.split('@')[0]}
                </span>
              </span>
            </div>
          )}
          <div
            className={classname(
              'relative flex items-center flex-wrap',
              style.items
            )}
          >
            {quiz.getAll.map((item) => (
              <div className={style.item} key={item._id}>
                <QuizItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Quiz;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  withAuth(ctx, (user) => {
    return {
      props: {
        me: user,
      },
    };
  });

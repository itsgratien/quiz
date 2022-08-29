import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import style from 'src/styles/Quiz.module.scss';
import QuizItem from '@/components/Quiz/QuizItem/QuizItem';
import { QuizStatus } from '@/generated/Quiz';
import { withAuth } from '@/utils/WithAuth';
import { QuizPageProps } from '@/generated/Quiz';
import { Icon } from '@iconify/react';
import classname from 'classnames';

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
          <div className={classname('relative flex items-center', style.items)}>
            <div className={style.item}>
              <QuizItem
                item={{
                  name: 'Javascript the programming language and the weird part',
                  status: QuizStatus.Draft,
                }}
                handleViewMore={() => ''}
              />
            </div>
            <div className={style.item}>
              <QuizItem
                item={{
                  name: 'Javascript the programming language and the weird part',
                  status: QuizStatus.Published,
                }}
              />
            </div>
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

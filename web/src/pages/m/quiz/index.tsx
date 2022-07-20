import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import style from '../../../styles/Quiz.module.scss';
import { QuizItem } from '@/components/Quiz/QuizItem';
import { QuizStatus, QuizItemT } from '@/generated/Quiz';
import { withAuth } from '@/components/HOC/WithAuth';

const Quiz: NextPage = () => {
  const items: QuizItemT[] = [
    {
      name: `Javascript for beginner's`,
      status: QuizStatus.Published,
      left: 10,
      createdAt: new Date().toDateString(),
      _id: 'id',
    },
    {
      name: `Introduction to algorithm in rwanda`,
      status: QuizStatus.Draft,
      left: 10,
      createdAt: new Date().toDateString(),
      _id: 'id',
    },
    {
      name: `Introduction to algorithm in tanzaniya`,
      status: QuizStatus.Published,
      left: 10,
      createdAt: new Date().toDateString(),
      _id: 'id',
    },
  ];
  return (
    <>
      <Head>
        <title>Quizzes</title>
      </Head>
      <Layout>
        <div className={style.q}>
          <div className={style.container}>
            <div className={style.quiz}>
              {items.map((item, index) => (
                <QuizItem item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Quiz;

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);

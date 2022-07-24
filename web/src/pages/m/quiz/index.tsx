import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import style from '../../../styles/Quiz.module.scss';
import { QuizItem } from '@/components/Quiz/QuizItem';
import { QuizStatus, QuizItemT } from '@/generated/Quiz';
import * as UserTypes from '@/generated/User';
import { useQuery } from '@apollo/client';
import { withAuth } from '@/utils/WithAuth';

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

  const { data, error } = useQuery<UserTypes.GetUserT>(
    UserTypes.GET_USER_QUERY
  );

  console.log('data', data);
  console.log('errors', JSON.stringify(error));
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  withAuth(ctx, (res: any) => {
    return {
      props: {},
    };
  });

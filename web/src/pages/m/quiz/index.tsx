import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import style from '../../../styles/Quiz.module.scss';
import { QuizItem } from '@/components/Quiz/QuizItem';
import { QuizStatus } from '@/generated/Shared';

const Quiz: NextPage = () => {
  const items = [
    {
      name: `Javascript for beginner's`,
      status: QuizStatus.Published,
      left: 10,
      date: new Date().toDateString(),
      _id: 'id',
    },
    {
      name: `Introduction to algorithm in rwanda`,
      status: QuizStatus.Draft,
      left: 10,
      date: new Date().toDateString(),
      _id: 'id',
    },
    {
      name: `Introduction to algorithm in tanzaniya`,
      status: QuizStatus.Published,
      left: 10,
      date: new Date().toDateString(),
      _id: 'id',
    },
  ];
  return (
    <>
      <Head>
        <title>Quizzes</title>
      </Head>
      <Layout>
        <div className={style.quiz}>
          {items.map((item, index) => (
            <QuizItem item={item} key={index} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Quiz;
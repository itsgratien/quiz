import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import style from '../../../styles/Quiz.module.scss';

const QuizDetail: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Quiz | {router.query.slug}</title>
      </Head>
      <Layout>
        <div className={style.quiz}>
          <div>detal</div>
        </div>
      </Layout>
    </>
  );
};

export default QuizDetail;

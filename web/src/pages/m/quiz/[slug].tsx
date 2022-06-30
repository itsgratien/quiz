import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import style from '../../../styles/Quiz.module.scss';
import classname from 'classnames';

const QuizDetail: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Quiz | {router.query.slug}</title>
      </Head>
      <Layout>
        <div className={style.q}>
          <div className={style.container}>
            <div className={style.a}>
              
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default QuizDetail;

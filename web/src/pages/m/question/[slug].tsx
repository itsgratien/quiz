import React from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import Layout from '@/components/Layout';
import classname from 'classnames';
import style from 'src/styles/Quiz.module.scss';
import { withAuth } from '@/utils/WithAuth';
import Head from 'next/head';
import Heading from '@/components/Quiz/QuestionDetail/Heading';
import DetailChoice from '@/components/Quiz/QuestionDetail/DetailChoice';
import Description from '@/components/Quiz/QuestionDetail/Description';

const QuestionDetailPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Question</title>
      </Head>
      <Layout goBack>
        <div className={classname(style.quizDetail)}>
          <Heading width="100%" />
        </div>
        <div
          className={classname('m-auto')}
          style={{ width: '1100px', marginTop: '42px' }}
        >
          <DetailChoice titleMarginLeft="18%" />
        </div>
        <div
          className={classname(style.quizDetail, 'm-auto')}
          style={{ margin: '40px auto', marginBottom: '200px' }}
        >
          <Description />
        </div>
      </Layout>
    </>
  );
};
export default QuestionDetailPage;

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  withAuth(ctx, () => {
    return {
      props: {},
    };
  });

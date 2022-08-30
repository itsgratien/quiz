import type { NextPage, GetServerSidePropsContext } from 'next';
import * as React from 'react';
import { withAuth } from '@/utils/WithAuth';
import Layout from '@/components/Layout';
import Head from 'next/head';
import classname from 'classnames';
import style from 'src/styles/Candidate.module.scss';
import Status from '@/components/Quiz/QuizItem/Status';

export const CandidatePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Candidate</title>
      </Head>
      <Layout goBack>
        <div className={classname('relative', style.header)}>
          <svg
            width="1100"
            height="350"
            viewBox="0 0 1100 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 10C0 4.47716 4.47715 0 10 0H1090C1095.52 0 1100 4.47715 1100 10V339.705C1100 345.342 1095.34 349.865 1089.71 349.701L9.70941 318.298C4.30202 318.141 0 313.712 0 308.302V10Z"
              fill="#FFEC44"
            />
          </svg>
          <div
            className={classname('absolute top-0 right-0 left-0 z-10 w-full')}
          >
            <div className={classname('font-bold text-25')}>
              Gratien Tuyishimire
            </div>
            <Status status="Completed" size="12" bold />
            <div className={classname('absolute top-10 right-20')}>
              <div className="flex items-center">
                <span className={classname('font-bold text-20 text-black')}>
                  50%
                </span>
                <span
                  className={classname('font-bold text-f1 text-15 ml-2')}
                  style={{ color: 'rgba(0, 0, 0, 0.28)' }}
                >
                  Overall grade
                </span>
              </div>
              <div className={classname('font-bold text-right text-14')}>
                Failed
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default CandidatePage;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  withAuth(context, () => {
    return {
      props: {},
    };
  });

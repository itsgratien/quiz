import type { NextPage, GetServerSidePropsContext } from 'next';
import * as React from 'react';
import { withAuth } from '@/utils/WithAuth';
import Layout from '@/components/Layout';
import Head from 'next/head';
import classname from 'classnames';
import style from 'src/styles/Candidate.module.scss';
import Status from '@/components/Quiz/QuizItem/Status';
import Svg from '@/components/Quiz/Candidates/SingleCandidate/SVG';
import CandidateLabel from '@/components/Quiz/Candidates/SingleCandidate/CandidateLabel';
import QuizUri from '@/components/Quiz/Candidates/SingleCandidate/QuizUri';
import SectionTitle from '@/components/Quiz/SectionTitle';
import AnswerGroup from '@/components/Quiz/Answer/AnswerGroup/AnswerGroup';
import AnswerMock from '@/mocks/Answer';

export const CandidatePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Candidate</title>
      </Head>
      <Layout goBack>
        <div className={classname('relative', style.header)}>
          <Svg />
          <div
            className={classname('absolute top-0 right-0 left-0 z-10 w-full')}
          >
            <div style={{ marginTop: '53px', marginLeft: '15%' }}>
              <div className={classname('font-bold text-25')}>
                Gratien Tuyishimire
              </div>
              <Status status="Completed" size="12" bold className="mt-19" />
            </div>
            <div className={classname('absolute top-0 right-20 mt-30')}>
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
            <div style={{ marginLeft: '13%', marginTop: '27px' }}>
              <div className="flex items-center">
                <CandidateLabel
                  label="Email Address"
                  value="gracian2020@gmail.com"
                  iconName="eva:email-outline"
                />
                <CandidateLabel
                  label="Phone Number"
                  value="+250786601005"
                  iconName="bi:phone"
                />
              </div>
              <div>
                <QuizUri value="https://igihe.com/?attendant=sdskdsd&test=igihe" />
              </div>
            </div>
          </div>
        </div>
        <div className={classname('relative', style.result)}>
          <div className={style.sectionTitle}>
            <SectionTitle title="Final Results" iconName="wpf:statistics" />
            <div
              className="text-12"
              style={{
                color: 'rgba(0, 0, 0, 0.6)',
                width: '186px',
                marginLeft: '32px',
              }}
            >
              Questions asked and answers of each provided by the attendants
            </div>
          </div>
          <div>
            {AnswerMock.getAll.map((item) => (
              <AnswerGroup key={item._id} />
            ))}
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

import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { withAuth } from '@/utils/WithAuth';
import { Layout } from '@/components/Layout';
import classname from 'classnames';
import style from 'src/styles/Quiz.module.scss';
import Status from '@/components/Quiz/QuizItem/Status';
import QDate from '@/components/Quiz/QuizItem/QuizDate';
import Head from 'next/head';
import apollo from '@/utils/ApolloClient';
import { GetSingleTestDocument, GetSingleTestQuery } from '@/generated/graphql';
import { QuizDetailPageProps } from '@/generated/Quiz';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import QuestionAsked from '@/components/Quiz/QuizDetail/QuestionAsked';
import InvitedCandidate from '@/components/Quiz/QuizDetail/InvitedCandidate';

const QuizDetailPage: NextPage<QuizDetailPageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <Layout goBack>
        <div className={style.quiz}>
          {data ? (
            <>
              <div className={classname('relative', style.quizDetail)}>
                <div className="text-25">{data.title}</div>
                <div className={style.status}>
                  <Status status={String(data.status)} />
                </div>
                <div style={{ marginTop: '29px' }}>
                  <QDate
                    label="start date & end date"
                    value={
                      <>
                        {new Date(data.startDate).toDateString()}&nbsp; to
                        &nbsp;
                        {new Date(data.endDate).toDateString()}
                      </>
                    }
                  />
                  <QDate
                    label="Subject"
                    value={data.subject}
                    iconName="mdi:air-humidifier"
                  />
                </div>
              </div>
              {data.questions && (
                <div
                  className={style.hr}
                  style={{ transform: 'rotate(-2.67deg)' }}
                ></div>
              )}
              <QuestionAsked testId={data._id} />
              {data.attendants && <div className={style.hr}></div>}
              <InvitedCandidate testId={data._id} />
            </>
          ) : (
            <NotFound message="Quiz Not Found" alignItem="center" />
          )}

          <div className="mt-5"></div>
        </div>
      </Layout>
    </>
  );
};
export default QuizDetailPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  withAuth(ctx, async () => {
    try {
      const { params }: any = ctx;

      const res = await apollo(ctx).query<GetSingleTestQuery>({
        query: GetSingleTestDocument,
        variables: { slug: params.slug },
      });

      const { getSingleTest } = res.data;

      if (getSingleTest && getSingleTest.data) {
        return {
          props: {
            data: getSingleTest.data,
          },
        };
      } else {
        return {
          notFound: true,
        };
      }
    } catch (error) {
      return {
        props: {},
      };
    }
  });

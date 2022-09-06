import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { withAuth } from '@/utils/WithAuth';
import { Layout } from '@/components/Layout';
import classname from 'classnames';
import style from 'src/styles/Quiz.module.scss';
import Status from '@/components/Quiz/QuizItem/Status';
import QDate from '@/components/Quiz/QuizItem/QuizDate';
import SectionTitle from '@/components/Quiz/SectionTitle';
import Grid from '@mui/material/Grid';
import QuestionItem from '@/components/Quiz/QuestionItem/QuestionItem';
import CandidateHeaderItem from '@/components/Quiz/Candidates/CandidateHeaderItem';
import { AttendantStatus } from '@/generated/Enum';
import candidate from '@/mocks/Candidate';
import CandidateItem from '@/components/Quiz/Candidates/CandidateItem';
import LoadMoreButton from '@/components/Quiz/LoadMoreButton';
import Head from 'next/head';
import apollo from '@/utils/ApolloClient';
import {
  GetSingleTestDocument,
  GetSingleTestQuery,
  Question,
  Attendant,
} from '@/generated/graphql';
import { QuizDetailPageProps } from '@/generated/Quiz';
import NotFound from '@/components/Quiz/Setup/View/NotFound';

const QuizDetailPage: NextPage<QuizDetailPageProps> = ({ data }) => {
  const [questions, setQuestions] = React.useState<Question[]>();

  const [candidates, setCandidates] = React.useState<Attendant[]>();

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <Layout goBack>
        <div className={style.quiz}>
          {data && (
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
              {data.questions && <div
                className={style.hr}
                style={{ transform: 'rotate(-2.67deg)' }}
              ></div>}
              <div className={classname('relative', style.section)}>
                <div className={classname(style.sectionTitle)}>
                  <SectionTitle
                    title="Question Asked"
                    total={
                      data.questions
                        ? `${data.questions.length} total results`
                        : undefined
                    }
                  />
                </div>
                {data.questions && data.questions.length > 0 && (
                  <>
                    <div className={classname(style.questionItems)}>
                      <Grid container spacing={8}>
                        {data.questions.map((item) => (
                          <Grid item xs={4} key={item.question._id}>
                            <QuestionItem
                              title={item.question.title}
                              points={item.question.points}
                              type={item.question.type as string}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                    {/* <LoadMoreButton
                      marginTop="49px"
                      className={style.sectionTitle}
                    /> */}
                  </>
                )}
                {!data.questions && (
                  <div className={style.notFound}>
                    <NotFound message=" " alignItem="start" />
                  </div>
                )}
              </div>
              {data.attendants && <div className={style.hr}></div>}
              <div className={classname('relative', style.section)}>
                <div className={classname(style.sectionTitle)}>
                  <SectionTitle
                    title="Invited Candidates"
                    total="50 total results"
                  />
                  <div className="flex items-center mt-5">
                    <CandidateHeaderItem
                      number={5}
                      status={AttendantStatus.Started}
                    />
                    <CandidateHeaderItem
                      number={20}
                      status={AttendantStatus.InProgress}
                    />
                    <CandidateHeaderItem
                      number={30}
                      status={AttendantStatus.Completed}
                    />
                  </div>
                </div>

                <div className={classname(style.questionItems)}>
                  <Grid container spacing={8}>
                    {candidate.getAll.map((item) => (
                      <Grid item xs={4} key={item._id}>
                        <CandidateItem {...item} handleViewAnswer={() => ''} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
                {/* <LoadMoreButton
                  marginTop="49px"
                  className={style.sectionTitle}
                /> */}
              </div>
            </>
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
    const { params }: any = ctx;

    const res = await apollo(ctx as any).query<GetSingleTestQuery>({
      query: GetSingleTestDocument,
      variables: { slug: params.slug },
    });

    return {
      props: {
        data: res.data.getSingleTest?.data,
      },
    };
  });

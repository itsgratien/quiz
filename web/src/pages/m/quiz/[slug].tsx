import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { withAuth } from '@/utils/WithAuth';
import { Layout } from '@/components/Layout';
import classname from 'classnames';
import style from 'src/styles/Quiz.module.scss';
import Status from '@/components/Quiz/QuizItem/Status';
import { QuizStatus } from '@/generated/Quiz';
import QDate from '@/components/Quiz/QuizItem/QuizDate';
import SectionTitle from '@/components/Quiz/SectionTitle';
import question from '@/mocks/Question';
import Grid from '@mui/material/Grid';
import QuestionItem from '@/components/Quiz/QuestionItem/QuestionItem';
import CandidateHeaderItem from '@/components/Quiz/Candidates/CandidateHeaderItem';
import { AttendantStatus } from '@/generated/Enum';
import candidate from '@/mocks/Candidate';
import CandidateItem from '@/components/Quiz/Candidates/CandidateItem';

const QuizDetailPage = () => {
  return (
    <Layout goBack>
      <div className={style.quiz}>
        <div className={classname('relative', style.quizDetail)}>
          <div className="text-25">
            Javascript The Programming Language And The Weird Part
          </div>
          <div className={style.status}>
            <Status status={QuizStatus.Published} />
          </div>
          <div style={{ marginTop: '29px' }}>
            <QDate
              label="start date & end date"
              value={
                <>
                  {new Date().toDateString()}&nbsp; to &nbsp;
                  {new Date().toDateString()}
                </>
              }
            />
            <QDate
              label="Subject"
              value="Programming"
              iconName="mdi:air-humidifier"
            />
          </div>
        </div>
        <div
          className={style.hr}
          style={{ transform: 'rotate(-2.67deg)' }}
        ></div>
        <div className={classname('relative', style.section)}>
          <div className={classname(style.sectionTitle)}>
            <SectionTitle title="Question Asked" total="50 total results" />
          </div>
          <div className={classname(style.questionItems)}>
            <Grid container spacing={8}>
              {question.getAll.map((item) => (
                <Grid item xs={4} key={item._id}>
                  <QuestionItem
                    title={item.title}
                    points={item.points}
                    type={item.type}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <div className={style.hr}></div>
        <div className={classname('relative', style.section)}>
          <div className={classname(style.sectionTitle)}>
            <SectionTitle title="Invited Candidates" total="50 total results" />
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
        </div>
      </div>
    </Layout>
  );
};
export default QuizDetailPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  withAuth(ctx, () => {
    const { params } = ctx;
    console.log('params', params);
    return {
      props: {},
    };
  });

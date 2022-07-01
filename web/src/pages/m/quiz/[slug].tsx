import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import style from '../../../styles/Quiz.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';
import { QuizStatus, PeopleT, QuestionT } from '@/generated/Quiz';
import { useQuizStatusColor } from '@/hooks/UseQuizStatus';
import Grid from '@mui/material/Grid';
import { SectionHeader } from '@/components/Quiz/SectionHeader';
const PeopleItem = React.lazy(() => import('@/components/Quiz/PeopleItem'));
const QuestionItem = React.lazy(() => import('@/components/Quiz/QuestionItem'));

const peoples: PeopleT[] = [
  {
    quizUri: 'https://quiz.com/gratien',
    names: 'Gratien Tuyishimire',
    email: 'gratientuyishimire@gmail.com',
    _id: String(Math.random()),
  },
  {
    quizUri: 'https://quiz.com/gratien',
    names: 'Gratien Tuyishimire',
    email: 'gratientuyishimire@gmail.com',
    _id: String(Math.random()),
  },
];

const questions: QuestionT[] = [
  {
    _id: String(Math.random()),
    title: 'What Is Capital City Of Rwanda ?',
    slug: '',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    owner: '',
    time: 1,
    choices: [
      'Programming Language',
      'Country',
      'City',
      'Golden Heart',
      'Laravel',
    ],
  },
  {
    _id: String(Math.random()),
    title: 'What Is Javascript ?',
    slug: '',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    owner: '',
    time: 1,
    choices: [
      'Programming Language',
      'Country',
      'City',
      'Golden Heart',
      'Laravel',
    ],
  },
];
const QuizDetail: NextPage = () => {
  const router = useRouter();

  const bgColor = useQuizStatusColor({ status: QuizStatus.Published });

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <Layout>
        <div className={style.q}>
          <div className={style.container}>
            <div
              className={classname(
                'relative flex justify-between',
                style.heading
              )}
            >
              <div>
                <button
                  type="button"
                  className={classname('flex items-center', style.back)}
                >
                  <Icon icon="akar-icons:chevron-left" fontSize={50} />
                  <span className="font-bold">back</span>
                </button>
                <div className={classname('flex flex-col', style.name)}>
                  <span className="font-bold">English Quiz</span>
                  <span className="font-bold">{new Date().toDateString()}</span>
                </div>
              </div>
              <div
                className={classname(
                  'relative flex items-center',
                  style.status
                )}
              >
                <div
                  className={style.color}
                  style={{ background: bgColor }}
                ></div>
                <div className={style.text}>{QuizStatus.Published}</div>
              </div>
            </div>
            <div className={style.other}>
              <div className={style.people}>
                <SectionHeader title="People" />
                <div className={classname('relative w-full', style.items)}>
                  <div
                    className={classname(
                      'absolute flex items-center justify-between left-0 right-0',
                      style.buttons
                    )}
                  >
                    <button type="button">
                      <Icon icon="akar-icons:chevron-left" fontSize={25} />
                    </button>
                    <button type="button">
                      <Icon icon="akar-icons:chevron-right" fontSize={25} />
                    </button>
                  </div>
                  <div className={classname('relative', style.ul)}>
                    <Grid container spacing={4}>
                      {peoples.map((item) => (
                        <Grid item xs={6} key={item._id}>
                          <React.Suspense fallback={<></>}>
                            <PeopleItem item={item} />
                          </React.Suspense>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </div>
              <div className={style.questions}>
                <SectionHeader title="Questions" />
                <div className={style.items}>
                  {questions.map((item) => (
                    <React.Suspense fallback={<></>} key={item._id}>
                      <QuestionItem item={item} />
                    </React.Suspense>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default QuizDetail;

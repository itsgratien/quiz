import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import style from '../../../styles/Quiz.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';
import { QuizStatus } from '@/generated/Quiz';
import { useQuizStatusColor } from '@/hooks/UseQuizStatus';
import Grid from '@mui/material/Grid';

const peoples = [
  {
    link: 'https://quiz.com/gratien',
    name: 'Gratien Tuyishimire',
    email: 'gratientuyishimire@gmail.com',
    id: Math.random(),
  },
  {
    link: 'https://quiz.com/gratien',
    name: 'Gratien Tuyishimire',
    email: 'gratientuyishimire@gmail.com',
    id: Math.random(),
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
                <div
                  className={classname('flex items-center', style.sectionTitle)}
                >
                  <div
                    className={classname('font-bold capitalize', style.title)}
                  >
                    People
                  </div>
                </div>
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
                        <Grid item xs={6} key={item.id}>
                          <div
                            className={classname('relative w-full', style.li)}
                          >
                            <div className={classname('relative', style.uri)}>
                              <div className={style.link}>{item.link}</div>
                              <button
                                type="button"
                                className={classname(
                                  'outline-none focus:outline-none flex items-center justify-center',
                                  style.copyBtn
                                )}
                              >
                                <Icon icon="entypo:creative-commons-share" />
                              </button>
                            </div>
                            <div>
                              <span className="font-bold">{item.name}</span>
                              <div className="flex items-center">
                                <Icon icon="carbon:email" fontSize={20} />
                                <small className="ml-1">{item.email}</small>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
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

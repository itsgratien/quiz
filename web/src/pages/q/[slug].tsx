import React from 'react';
import classname from 'classnames';
import style from 'src/styles/Quiz.module.scss';
import Head from 'next/head';
import Svg from '@/components/Quiz/StartQuiz/Svg';
import { Icon } from '@iconify/react';

const Quiz = () => {
  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <div className={classname('relative w-full', style.startQuiz)}>
        <Svg />
        <div className={classname('absolute top-0 left-0 right-0', style.main)}>
          <div
            className={classname(
              style.header,
              'mx-auto flex items-center justify-between'
            )}
          >
            <div className={style.logo}>quiz</div>
            <button
              type="button"
              className={classname(
                style.startButton,
                'flex items-center justify-center'
              )}
            >
              <Icon
                icon="bi:play-circle-fill"
                fontSize={30}
                color="rgba(0, 0, 0, 0.3)"
              />
              <span className="text-black text-14 ml-3 font-bold">Start</span>
            </button>
          </div>
          <div
            className={classname('relative mx-auto bg-white', style.details)}
          >
            <div className={style.testName}>{`Javascript for beginner's`}</div>
            <div className={style.date}>
              <span>Starting From</span>
              <span className="font-bold ml-1">
                {new Date().toDateString()}
              </span>
              <span className="ml-1">To</span>
              <span className="font-bold ml-1">
                {new Date().toDateString()}
              </span>
            </div>
            <div className={classname(style.question)}>
              <div
                className={classname(
                  style.number,
                  'relative rounded-full flex items-center justify-center bg-primary'
                )}
                style={{ width: '80px', height: '80px', fontSize: '30px' }}
              >
                50
              </div>
              <div className={style.line}></div>
              <div
                className="text-14 text-center"
                style={{ marginTop: '15px' }}
              >
                questions
              </div>
            </div>
            <div className={classname(style.instructions, 'relative')}>
              <div className={classname('font-bold text-14', style.title)}>
                Instructions
              </div>
              <div className={style.lists}>
                <ul className="grid grid-cols-2">
                  <li className="flex">
                    <Icon icon="akar-icons:check-box-fill" />
                    <span className="text-14">
                      make sure that you have good internet
                    </span>
                  </li>
                  <li className="flex">
                    <Icon icon="akar-icons:check-box-fill" />
                    <span className="text-14">
                      make sure that you have good internet
                    </span>
                  </li>
                  <li className="flex">
                    <Icon icon="akar-icons:check-box-fill" />
                    <span className="text-14">
                      make sure that you have good internet
                    </span>
                  </li>
                  <li className="flex">
                    <Icon icon="akar-icons:check-box-fill" />
                    <span className="text-14">
                      make sure that you have good internet
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;

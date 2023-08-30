import React from 'react';
import style from './Start.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';
import Svg from './Svg';
import Header from './Header';
import { instructions } from '@/utils/Static';
import useTodo from '@/hooks/useTodo';

const Start = () => {
  const todo = useTodo();

  const { test, numberOfQuestions } = todo;

  return (
    <div className={classname('relative w-full', style.startQuiz)}>
      <Svg />
      <div className={classname('absolute top-0 left-0 right-0', style.main)}>
        <Header />
        <div className={classname('relative mx-auto bg-white', style.details)}>
          {test ? (
            <>
              <div className={style.testName}>{test.title}</div>
              <div className={style.date}>
                <span>Starting From</span>
                <span className="font-bold ml-1">
                  {new Date(test.startDate).toDateString()}
                </span>
                <span className="ml-1">To</span>
                <span className="font-bold ml-1">
                  {new Date(test.endDate).toDateString()}
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
                  {numberOfQuestions}
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
                    {instructions.map((item, itemKey) => (
                      <li className="flex" key={itemKey}>
                        <Icon icon="akar-icons:check-box-fill" />
                        <span className="text-14">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div
              className={classname(
                'flex items-center flex-col justify-center h-full'
              )}
              style={{ marginTop: '90px' }}
            >
              <Icon icon="emojione-v1:empty-note-page" fontSize={100} />
              <span className="mt-1" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                quiz was expired
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Start;

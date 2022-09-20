import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import { Question } from '@/generated/graphql';

const GetQuestion = ({ question }: { question: Question }) => {
  return (
    <div className={classname(style.qDetail)}>
      <div className={classname('flex flex-col', style.qHeading)}>
        <span className="text-12" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          question
        </span>
        <span
          className={classname('font-bold text-black mt-2')}
          style={{ fontSize: '18px', width: '500px' }}
        >
          {question.title}
        </span>
      </div>
      {question.choices && (
        <div className={classname(style.choices, 'relative')}>
          {question.choices.length > 0 && (
            <ul>
              {question.choices.map((item, itemKey) => (
                <li
                  className={classname(
                    'relative flex',
                    item.length <= 70 ? 'items-center' : 'items-start'
                  )}
                  key={itemKey}
                >
                  <button
                    type="button"
                    className={classname(
                      'outline-none focus:outline-none',
                      style.btn
                    )}
                  ></button>
                  <span className="text-14">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GetQuestion;

import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import { Question } from '@/generated/graphql';
import { Icon } from '@iconify/react';

const GetQuestion = ({
  question,
  answers,
  handleAnswer,
}: {
  question: Question;
  answers?: string[];
  handleAnswer: (value: string) => void;
}) => {
  const handleSelectedChoice = (choice: string) => {
    if (answers) {
      const find = answers.find((item) => item === choice);

      if (find) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={classname(style.qDetail)}>
      <div className={classname('flex flex-col relative', style.qHeading)}>
        <span className="text-12" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          question
        </span>
        <span
          className={classname('font-bold text-black mt-2')}
          style={{ fontSize: '18px', width: '500px' }}
        >
          {question.title}
        </span>
        <div
          className={classname('absolute right-0 top-0 text-12 font-bold')}
          style={{
            marginRight: '47px',
            marginTop: '25px',
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          / {question.points} points
        </div>
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
                  onClick={() => handleAnswer(item)}
                >
                  <button
                    type="button"
                    className={classname(
                      'outline-none focus:outline-none flex items-center justify-center',
                      style.btn,
                      handleSelectedChoice(item) && style.btnChecked
                    )}
                  >
                    {handleSelectedChoice(item) && (
                      <Icon
                        icon="bi:check-lg"
                        fontSize={30}
                        color="rgba(0, 0, 0, 0.5)"
                      />
                    )}
                  </button>
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

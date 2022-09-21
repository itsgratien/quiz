import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import { Question } from '@/generated/graphql';

const QuestionLeft = ({
  question,
  questionId,
  toggleQuestionId,
  active,
  setActive,
}: {
  question: Question;
  questionId?: string;
  toggleQuestionId?: (value: string) => void;
  active: boolean;
  setActive: (value: boolean) => void;
}) => {
  const handleTitle = (value: string) => {
    if (value.length > 105) {
      return `${value.substring(0, 105)}...`;
    }
    return value;
  };

  const handleChangeQuestionId = React.useCallback(
    (value: string) => {
      if (toggleQuestionId) {
        toggleQuestionId(value);
        setActive(true);
      }
    },
    [setActive, toggleQuestionId]
  );

  return (
    <li
      className={classname(
        style.listItem,
        active && questionId === question._id && style.activeList
      )}
      onClick={() => handleChangeQuestionId(question._id)}
      key={question._id}
    >
      <div className={classname(style.container, 'bg-white')}>
        <div className={classname('text-black text-14')}>
          {handleTitle(question.title)}
        </div>
        <div
          className={classname(style.qType, 'flex items-center justify-center')}
        >
          {question.type}
        </div>
      </div>
    </li>
  );
};
export default QuestionLeft;

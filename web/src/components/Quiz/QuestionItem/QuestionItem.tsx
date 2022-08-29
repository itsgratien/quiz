import * as React from 'react';
import classname from 'classnames';
import style from './QuestionItem.module.scss';
import QuestionType from './QType';
import ViewMoreButton from '../QuizItem/ViewMoreButton';

const QuestionItem = ({
  title,
  points,
  type,
}: {
  title: string;
  points: string | number;
  type: string;
}) => {
  const handleTitle = (value: string) => {
    if (value.length > 55) {
      const newV = value.slice(0, 55);
      return `${newV} ..`;
    } else {
      return value;
    }
  };
  return (
    <div
      className={classname(
        'relative w-full bg-f1 rounded-10',
        style.questionItem
      )}
    >
      <div className={classname('text-14', style.qName)}>
        {handleTitle(title)}
      </div>
      <div className={classname('relative flex items-center')}>
        <QuestionType name={type} />
        <QuestionType name={`${points} Points`} point />
      </div>
      <div className={classname(style.viewMore, 'absolute')}>
        <ViewMoreButton size="small" />
      </div>
    </div>
  );
};

export default QuestionItem;

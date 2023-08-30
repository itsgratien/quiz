import * as React from 'react';
import classname from 'classnames';
import style from './QuestionItem.module.scss';
import QuestionType from './QType';
import ViewMoreButton from '../QuizItem/ViewMoreButton';
import ViewMore from '../ViewMore';
import RightButton from '@/components/Quiz/RightButtons';
import EditButton from './EditButton';

const QuestionItem = ({
  title,
  points,
  type,
  handleEdit,
  handleView,
}: {
  title: string;
  points: string | number;
  type: string;
  handleEdit?: () => void;
  handleView?: () => void;
}) => {
  const handleTitle = () => {
    if (title && title.length > 55) {
      const newV = title.slice(0, 55);
      return `${newV} ..`;
    } else {
      return title;
    }
  };
  return (
    <div
      className={classname(
        'relative w-full bg-f1 rounded-10',
        style.questionItem
      )}
    >
      <div className={classname('text-14', style.qName)}>{handleTitle()}</div>
      <div className={classname('relative flex items-center')}>
        <QuestionType name={type} />
        <QuestionType name={`${points} Points`} point />
      </div>
      {handleView && (
        <ViewMore className={style.viewMore}>
          <ViewMoreButton size="small" handleClick={handleView} />
        </ViewMore>
      )}
      <RightButton className={style.rightBtn}>
        {handleEdit && <EditButton />}
      </RightButton>
    </div>
  );
};

export default QuestionItem;

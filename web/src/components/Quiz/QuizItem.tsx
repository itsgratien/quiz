import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';
import { QuizItemPropsT } from '@/generated/Shared';
import { useQuizStatusColor } from '@/hooks/UseQuizStatus';

export const QuizItem = ({ item }: QuizItemPropsT) => {
  const bgColor = useQuizStatusColor({ status: item.status });

  return (
    <div className={classname('bg-white relative', style.quizItem)}>
      <div className={classname('absolute', style.date)}>{item.date}</div>
      <span className={classname('font-bold')}>{item.name}</span>
      <div
        className={classname('flex justify-between items-center', style.info)}
      >
        <div className={classname('flex items-center', style.status)}>
          <div className={style.color} style={{ background: bgColor }}></div>
          <span>{item.status}</span>
        </div>
        <div className={classname('flex items-center', style.number)}>
          {item.left} people left to submit
        </div>
      </div>
      <div className={style.hr}></div>
    </div>
  );
};

import * as React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';
import { StatItemProps } from '@/generated/Quiz';

const StatItem = ({ title, number }: StatItemProps) => {
  return (
    <div className={classname('flex', style.statItem)}>
      <div className="font-bold text-20">{number}</div>
      <div className={style.text}>{title}</div>
    </div>
  );
};
export default StatItem;

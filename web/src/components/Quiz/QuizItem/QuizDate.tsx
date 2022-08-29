import * as React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';
import { Icon } from '@iconify/react';

export const QuizDate = ({
  label,
  value,
  iconName,
}: {
  label: string;
  value: any;
  iconName?: string;
}) => {
  return (
    <div className={style.date}>
      <div className={classname('relative flex items-center', style.label)}>
        <Icon
          icon={iconName || 'clarity:date-outline-badged'}
          fontSize={25}
          className={style.icon}
          width={25}
        />
        <span className="font-bold lowercase">{label}</span>
      </div>
      <div className={style.text}>{value}</div>
    </div>
  );
};
export default QuizDate;

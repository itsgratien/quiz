import * as React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';
import { useQuizStatusColor } from '@/hooks/UseQuizStatus';

export const Status = ({
  status,
  size,
  bold,
}: {
  status: string;
  size?: '12' | '14' | '15';
  bold?: boolean;
}) => {
  const bgColor = useQuizStatusColor({ status });
  return (
    <div
      className={classname(
        style.status,
        ' text-black text-center flex items-center justify-center',
        `text-${size || '14'} font-${bold ? 'bold' : 'normal'}`
      )}
      style={{ backgroundColor: bgColor }}
    >
      {status}
    </div>
  );
};

export default Status;

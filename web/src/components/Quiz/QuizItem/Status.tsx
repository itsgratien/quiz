import * as React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';
import { useQuizStatusColor } from '@/hooks/UseQuizStatus';

export const Status = ({ status }: { status: string }) => {
  const bgColor = useQuizStatusColor({ status });
  return (
    <div
      className={classname(
        style.status,
        ' text-black text-center flex items-center justify-center text-14'
      )}
      style={{ backgroundColor: bgColor }}
    >
      {status}
    </div>
  );
};

export default Status;

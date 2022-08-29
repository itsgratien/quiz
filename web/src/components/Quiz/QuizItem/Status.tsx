import * as React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';

export const Status = ({ status }: { status: string }) => {
  return (
    <div
      className={classname(
        style.status,
        'font-bold text-black text-center flex items-center justify-center'
      )}
    >
      {status}
    </div>
  );
};

export default Status;

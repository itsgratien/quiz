import * as React from 'react';
import classname from 'classnames';
import style from './QuestionItem.module.scss';

export const QuestionType = ({
  name,
  point,
}: {
  name: string;
  point?: boolean;
}) => {
  return (
    <div
      className={classname(
        style.qType,
        'text-12 rounded-10 flex items-center justify-center'
      )}
      style={{
        background: point ? 'rgba(0, 163, 255, 0.5)' : 'rgba(0, 0, 0, 0.12)',
      }}
    >
      {name}
    </div>
  );
};
export default QuestionType;

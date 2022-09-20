import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import { Icon } from '@iconify/react';

const Empty = () => {
  return (
    <div
      className={classname(
        style.emptySpace,
        'flex items-center justify-center flex-col'
      )}
      style={{ height: '60vh' }}
    >
      <Icon
        icon="majesticons:paper-fold-line"
        fontSize={100}
        color="rgba(0, 0, 0, 0.5)"
      />
      <div
        className={classname('text-12')}
        style={{
          width: '281px',
          marginTop: '28px',
          color: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        use the left side where there are a list of questions. click on one if
        you would like to open it
      </div>
    </div>
  );
};
export default Empty;

import React from 'react';
import classname from 'classnames';
import style from './SingleCandidate.module.scss';
import { Icon } from '@iconify/react';

const QuizUri = ({ label, value }: { value: string; label?: string }) => {
  return (
    <div className={classname('relative', style.quizUri)}>
      <div className="ml-10 text-12 uppercase">{label || 'Quiz Link'}</div>
      <div
        className={classname(
          'relative flex items-center justify-between rounded mt-2',
          style.input
        )}
      >
        <input
          type="text"
          value={value}
          disabled
          className="outline-none focus:outline-none text-12 font-bold"
        />
        <button
          type="button"
          className={classname(
            'outline-none focus:outline-none border-none rounded-10 bg-black flex items-center justify-center'
          )}
          style={{ width: '50px', height: '45px' }}
        >
          <Icon
            icon="fluent:copy-24-regular"
            fontSize={35}
            color="rgba(255, 236, 68, 0.5)"
          />
        </button>
      </div>
    </div>
  );
};
export default QuizUri;

import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';

const RightBottom = () => {
  return (
    <div
      className={classname(
        'fixed bottom-0 bg-white right-0 left-0 bg-white',
        style.footer
      )}
    >
      <button
        type="button"
        className={classname(
          'outline-none focus:outline-none uppercase text-14 text-white relative',
          style.submitBtn
        )}
      >
        SUBMIT ANSWER
      </button>
    </div>
  );
};
export default RightBottom;

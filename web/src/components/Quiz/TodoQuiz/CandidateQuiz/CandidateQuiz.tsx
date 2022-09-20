import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

const CandidateQuiz = () => {
  return (
    <div className={classname('bg-white w-full', style.candidateQuiz)}>
      <div className={classname('relative')}>
        <LeftSidebar />
        <RightSidebar questionId="question" />
      </div>
    </div>
  );
};
export default CandidateQuiz;

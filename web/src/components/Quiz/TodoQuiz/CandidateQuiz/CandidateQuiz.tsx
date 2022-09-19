import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

const CandidateQuiz = () => {
  return (
    <div className={classname('bg-white w-full', style.candidateQuiz)}>
      <div className={classname('relative')}>
        <LeftSidebar title="Test For Programming Language" questionId="" />
        <RightSidebar
          candidate={{
            _id: 'none',
            names: 'john doe',
            email: 'johndoe@gmail.com',
            phoneNumber: '+250786601005',
          }}
          questionId="question"
        />
      </div>
    </div>
  );
};
export default CandidateQuiz;

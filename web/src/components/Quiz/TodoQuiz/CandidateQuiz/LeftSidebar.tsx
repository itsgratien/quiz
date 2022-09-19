import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';

const LeftSidebar = ({
  title,
  questionId,
}: {
  title: string;
  questionId: string;
}) => {
  const [active, setActive] = React.useState<string>();

  const handleActive = (value: string) => setActive(value);
  return (
    <div className={classname('fixed top-0 bottom-0', style.leftSidebar)}>
      <div className={classname('font-bold text-black', style.testTitle)}>
        {title}
      </div>
      <div className={classname(style.questions)}>
        <div className={classname('font-bold', style.qTitle)}>Questions</div>
        <div className={classname(style.listOfQuestions)}>
          <ul>
            <li
              className={classname(
                style.listItem,
                active === 'aban' && style.activeList
              )}
              onClick={() => handleActive('aban')}
            >
              <div className={classname(style.container, 'bg-white')}>
                <div className={classname('text-black text-14')}>
                  What caused UI to crash
                </div>
                <div
                  className={classname(
                    style.qType,
                    'flex items-center justify-center'
                  )}
                >
                  Multiple Choice
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;

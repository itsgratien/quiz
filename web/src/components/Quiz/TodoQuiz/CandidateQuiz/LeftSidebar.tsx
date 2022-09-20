import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import useTodo from '@/hooks/useTodo';
import useGetQuestion from '@/hooks/useGetQuestionAssignedToTest';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import NotFound from '../../Setup/View/NotFound';

const LeftSidebar = () => {
  const [active, setActive] = React.useState<boolean>();

  const { test, toggleQuestionId, questionId } = useTodo();

  const { loading, items } = useGetQuestion({
    testId: test?._id,
    limit: 30,
  });

  const handleChangeQuestionId = React.useCallback(
    (value: string) => {
      if (toggleQuestionId) {
        toggleQuestionId(value);
        setActive(true);
      }
    },
    [toggleQuestionId]
  );

  const handleTitle = (value: string) => {
    if (value.length > 105) {
      return `${value.substring(0, 105)}...`;
    }
    return value;
  };

  if (!test) {
    return null;
  }

  return (
    <div className={classname('fixed top-0 bottom-0 z-50', style.leftSidebar)}>
      <div className={classname('font-bold text-black', style.testTitle)}>
        {test.title}
      </div>
      <div className={classname(style.questions)}>
        <div className={classname('font-bold', style.qTitle)}>Questions</div>
        {loading && (
          <div className="text-center mt-20">
            <LoadingSpinner />
          </div>
        )}
        {items && !loading && (
          <>
            <div className={classname(style.listOfQuestions)}>
              {items.length > 0 ? (
                <ul>
                  {items.map((item) => (
                    <li
                      className={classname(
                        style.listItem,
                        active && questionId === item._id && style.activeList
                      )}
                      onClick={() => handleChangeQuestionId(item._id)}
                      key={item._id}
                    >
                      <div className={classname(style.container, 'bg-white')}>
                        <div className={classname('text-black text-14')}>
                          {handleTitle(item.title)}
                        </div>
                        <div
                          className={classname(
                            style.qType,
                            'flex items-center justify-center'
                          )}
                        >
                          {item.type}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <NotFound alignItem="center" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default LeftSidebar;

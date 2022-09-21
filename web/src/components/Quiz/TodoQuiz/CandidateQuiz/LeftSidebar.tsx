import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import useTodo from '@/hooks/useTodo';
import useGetQuestion from '@/hooks/useGetQuestionAssignedToTest';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import NotFound from '../../Setup/View/NotFound';
import QuestionLeft from './QuestionLeft';
import { Question } from '@/generated/graphql';

const LeftSidebar = () => {
  const [active, setActive] = React.useState<boolean>(false);

  const { test, toggleQuestionId, questionId } = useTodo();

  const { loading, items } = useGetQuestion({
    testId: test?._id,
    limit: 30,
  });

  React.useEffect(() => {
    if (items && items.length > 0 && toggleQuestionId && !questionId) {
      toggleQuestionId(items[0]._id);
      setActive(true);
    }
  }, [items, questionId, toggleQuestionId]);

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
                    <QuestionLeft
                      question={item as Question}
                      key={item._id}
                      questionId={questionId}
                      toggleQuestionId={toggleQuestionId}
                      active={active}
                      setActive={setActive}
                    />
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

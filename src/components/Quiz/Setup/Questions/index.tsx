import React from 'react';
import cn from 'classnames';
import styles from './Questions.module.scss';
import Buttons from '../Buttons';
import { useSetup } from '@/hooks/useSetup';
import useGetQuestionAssignedToTest from '@/hooks/useGetQuestionAssignedToTest';
import { Empty } from 'antd';
import QuestionType from './QuestionType';
import Mcq from './Mcq';
import { QuestionContext } from '@/contexts/SetupContext';
import { QuestionContextValue } from '@/generated/Quiz';

export const Questions = () => {
  const [openMcq, setOpenMcq] = React.useState<boolean>(false);

  const { test, setStep } = useSetup();

  const defaultTestId = '64fd9f67691dfdb245fea1a3';

  const { items, handleLoadMore, loading, handleReload } =
    useGetQuestionAssignedToTest({ testId: test?._id, limit: 100 });

  const questionContextValue: QuestionContextValue = React.useMemo(
    () => ({ openMcq, setOpenMcq }),
    [openMcq, setOpenMcq],
  );

  return (
    <QuestionContext.Provider value={questionContextValue}>
      <QuestionContext.Consumer>
        {() => (
          <div className={cn('relative', styles.questions)}>
            <Mcq open={openMcq} onClose={() => setOpenMcq(false)} />
            <QuestionType />
            {items && (
              <div className={cn('my-5')}>
                {items.length > 0 ? (
                  <></>
                ) : (
                  <div className={cn(styles.notFoundSec)}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </div>
            )}
            <Buttons
              submitButton={{ onClick: () => alert('aha') }}
              backButton={{ onClick: () => setStep(0) }}
            />
          </div>
        )}
      </QuestionContext.Consumer>
    </QuestionContext.Provider>
  );
};
export default Questions;

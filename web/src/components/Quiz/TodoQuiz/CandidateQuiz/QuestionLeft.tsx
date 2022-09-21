import React from 'react';
import classname from 'classnames';
import style from './CandidateQuiz.module.scss';
import { Question } from '@/generated/graphql';
import useTodo from '@/hooks/useTodo';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import useGetAnswer from '@/hooks/useGetAnswer';
import { Icon } from '@iconify/react';

const QuestionLeft = ({
  question,
  questionId,
  toggleQuestionId,
  active,
  setActive,
}: {
  question: Question;
  questionId?: string;
  toggleQuestionId?: (value: string) => void;
  active: boolean;
  setActive: (value: boolean) => void;
}) => {
  const { test, attendant } = useTodo();

  const { data, loading } = useGetAnswer({
    questionId: question._id,
    test: test?._id,
    attendant: attendant?._id,
  });

  const handleTitle = (value: string) => {
    if (value.length > 105) {
      return `${value.substring(0, 105)}...`;
    }
    return value;
  };

  const handleChangeQuestionId = React.useCallback(
    (value: string) => {
      if (toggleQuestionId && !data) {
        toggleQuestionId(value);
        setActive(true);
      }
    },
    [data, setActive, toggleQuestionId]
  );

  return (
    <li
      className={classname(
        'relative',
        style.listItem,
        active && questionId === question._id && style.activeList,
        data ? 'cursor-not-allowed' : 'cursor-pointer',
        data && style.answeredList
      )}
      onClick={() => handleChangeQuestionId(question._id)}
      key={question._id}
      title={data ? 'You answered this question' : undefined}
    >
      <div className={classname(style.container, 'bg-white relative')}>
        <div
          className={classname('text-black text-14')}
          style={{ marginRight: '80px' }}
        >
          {handleTitle(question.title)}
        </div>
        <div className="flex items-center">
          <div
            className={classname(
              style.qType,
              'flex items-center justify-center'
            )}
          >
            {question.type}
          </div>
          {data && (
            <div
              className={classname(
                style.qType,
                'flex items-center justify-center ml-3'
              )}
              style={{ background: '#ffec44' }}
            >
              Answered
            </div>
          )}
        </div>
        {data && (
          <div
            className={classname(
              'absolute top-0 right-0 bg-white flex items-center justify-center',
              style.isAnswered
            )}
          >
            <Icon
              icon="akar-icons:circle-check-fill"
              color="#00EF8B"
              fontSize={35}
            />
          </div>
        )}
        {loading && (
          <div
            className={classname(
              'absolute top-0 right-0 bg-white flex items-center justify-center',
              style.isAnswered
            )}
          >
            <LoadingSpinner size={30} />
          </div>
        )}
      </div>
    </li>
  );
};
export default QuestionLeft;

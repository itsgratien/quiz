import React from 'react';
import style from './CandidateQuiz.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';
import useTodo from '@/hooks/useTodo';
import { useGetQuestionLazyQuery } from '@/generated/graphql';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import { toast } from 'react-hot-toast';
import Empty from './Empty';
import RightBottom from './RightBottom';
import GetQuestion from './GetQuestion';
import { Question } from '@/generated/graphql';

const RightSidebar = () => {
  const { attendant: candidate, questionId } = useTodo();

  const [getQuestionFunc, { data, loading, error }] = useGetQuestionLazyQuery({
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    if (questionId) {
      getQuestionFunc({ variables: { id: questionId } });
    }
  }, [getQuestionFunc, questionId]);

  React.useEffect(() => {
    if (data && data.getQuestion) {
      if (data.getQuestion.error) {
        toast.error(data.getQuestion.error);
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (error) {
      toast.error('Something Went Wrong');
    }
  }, [error]);

  if (!candidate) {
    return null;
  }

  return (
    <div className={classname(style.rightSidebar)}>
      <div className={classname('flex justify-end')}>
        <div>
          <span className="font-bold text-14 capitalize">
            {candidate.names}
          </span>
          <div className="flex items-center" style={{ marginTop: '-5px' }}>
            <span style={{ fontSize: '12px' }}>{candidate.email}</span>
            <Icon
              icon="clarity:email-line"
              fontSize={30}
              style={{ marginLeft: '10px' }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div
          className="text-center flex items-center justify-center"
          style={{ height: '70vh' }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {data && data.getQuestion && data.getQuestion.data ? (
            <>
              <GetQuestion question={data.getQuestion.data as Question} />
              <RightBottom />
            </>
          ) : (
            <Empty />
          )}
        </>
      )}
    </div>
  );
};
export default RightSidebar;

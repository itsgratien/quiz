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
import { Question, useAnswerMcQuestionMutation } from '@/generated/graphql';
import WarningModal from '@/components/Shared/Alert/WarningAlertModal';
import useGetAnswer from '@/hooks/useGetAnswer';

const RightSidebar = () => {
  const [answers, setAnswers] = React.useState<string[]>([]);

  const [warn, setWarn] = React.useState<boolean>(false);

  const { attendant: candidate, questionId, query, test } = useTodo();

  const getAnswerResponse = useGetAnswer({
    test: test?._id,
    attendant: candidate?._id,
    questionId,
  });

  const { refetch } = getAnswerResponse;

  const [getQuestionFunc, { data, loading, error }] = useGetQuestionLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [answerFunc, { data: answerResponse, loading: answerLoading }] =
    useAnswerMcQuestionMutation();

  const handleAnswer = (value: string) => {
    const findAnswer = answers.find((item) => item === value);

    if (findAnswer) {
      const filterAnswer = answers.filter((item) => item !== value);
      setAnswers(filterAnswer);
    } else {
      setAnswers((item) => [...item, value]);
    }
  };

  const handleSubmitAnswer = async () => {
    if (answers.length > 0 && questionId && query) {
      setWarn(false);
      await answerFunc({
        variables: {
          answers,
          test: query.test,
          attendant: query.attendant,
          question: questionId,
        },
      });
    }
  };

  const handleWarn = () => {
    setWarn(!warn);
  };

  React.useEffect(() => {
    if (questionId) {
      getQuestionFunc({ variables: { id: questionId } });
      setAnswers([]);
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

  React.useEffect(() => {
    if (answerResponse && answerResponse.answerMcQuestion) {
      if (answerResponse.answerMcQuestion.error) {
        toast.error(answerResponse.answerMcQuestion.error);
      }
      if (answerResponse.answerMcQuestion.message) {
        toast.success(answerResponse.answerMcQuestion.message);
        refetch();
        setAnswers([]);
      }
    }
  }, [answerResponse, refetch]);

  if (!candidate) {
    return null;
  }

  console.log('get', getAnswerResponse);

  return (
    <div className={classname(style.rightSidebar)}>
      {warn && (
        <WarningModal
          open={warn}
          handleClose={handleWarn}
          enable={{ name: 'Yes Submit', onClick: handleSubmitAnswer }}
          disable={{ name: 'Cancel', onClick: handleWarn }}
          message="Are you sure you want to submit ?"
        />
      )}
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

      {loading || getAnswerResponse.loading ? (
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
              {!getAnswerResponse.data && (
                <>
                  <GetQuestion
                    question={data.getQuestion.data as Question}
                    answers={answers}
                    handleAnswer={handleAnswer}
                  />
                  <RightBottom
                    handleSubmit={handleWarn}
                    loading={answerLoading}
                  />
                </>
              )}
              {getAnswerResponse.data && (
                <Empty
                  iconName="akar-icons:circle-check-fill"
                  message="You have already submitted the answer of 
                this question"
                />
              )}
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

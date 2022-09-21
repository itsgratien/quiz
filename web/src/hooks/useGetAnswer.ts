import React from 'react';
import { useGetAnswerLazyQuery, Answer } from '@/generated/graphql';
import { toast } from 'react-hot-toast';

const useGetAnswer = ({
  questionId,
  test,
  attendant,
}: {
  questionId?: string;
  test?: string;
  attendant?: string;
}) => {
  const [getAnswerFunc, { data, loading, error, refetch }] =
    useGetAnswerLazyQuery();

  React.useEffect(() => {
    if (questionId && test && attendant) {
      getAnswerFunc({ variables: { question: questionId, test, attendant } });
    }
  }, [questionId, attendant, test, getAnswerFunc]);

  React.useEffect(() => {
    if (error) {
      toast.error('Something Went Wrong');
    }
  }, [error]);

  return {
    loading,
    data:
      (data && data.getAnswer && (data.getAnswer.data as Answer)) || undefined,
    refetch,
  };
};
export default useGetAnswer;

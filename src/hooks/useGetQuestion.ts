import React from 'react';
import { useGetQuestionQuery } from '@/generated/graphql';
import { toast } from 'react-hot-toast';

const useGetQuestion = ({ questionId }: { questionId: string }) => {
  const { data, loading } = useGetQuestionQuery({
    variables: { id: questionId },
  });

  React.useEffect(() => {
    if (data && data.getQuestion && data.getQuestion.error) {
      toast.error(data.getQuestion.error);
    }
  }, [data]);

  return {
    loading,
    data: data?.getQuestion.data,
    error: data?.getQuestion.error,
  };
};
export default useGetQuestion;

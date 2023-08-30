import React from 'react';
import { useGetQuestionAssignedToTestLazyQuery } from '@/generated/graphql';
import { Question } from '@/server/Models/QuestionModel';
import { toast } from 'react-hot-toast';

const useGetQuestionAssignedToTest = ({
  testId,
  limit,
}: {
  testId?: string;
  limit: number;
}) => {
  const defaultPage = 1;

  const [page, setPage] = React.useState<number>(defaultPage);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [
    getQuestion,
    { loading: loadingResponse, data, fetchMore, refetch, error },
  ] = useGetQuestionAssignedToTestLazyQuery();

  const handleLoadMore = async () => {
    const newPage = page + 1;
    setPage(newPage);
    setLoading(true);
    await fetchMore({ variables: { page: newPage, testId, limit } });
  };

  const handleReload = React.useCallback(async () => {
    if (testId) {
      setLoading(true);
      setPage(defaultPage);
      await refetch({ page: defaultPage, testId, limit });
    }
  }, [testId, refetch, limit]);

  React.useEffect(() => {
    if (testId) {
      setLoading(true);
      getQuestion({
        variables: { page, testId, limit: limit },
      });
    }
    // eslint-disable-next-line
  }, [testId, getQuestion]);

  React.useEffect(() => {
    if (data && data.getQuestionAssignedToTest) {
      setLoading(false);

      if (data.getQuestionAssignedToTest.error) {
        toast.error(data.getQuestionAssignedToTest.error);
      }
    }
  }, [data]);

  React.useEffect(() => {
    setLoading(loadingResponse);
  }, [loadingResponse]);

  React.useEffect(() => {
    if (error) {
      toast.error('Something Went Wrong');
    }
  }, [error]);

  return {
    loading,
    totalDoc: data?.getQuestionAssignedToTest.totalDocs,
    items: data?.getQuestionAssignedToTest.items as Question[],
    handleLoadMore,
    error: data?.getQuestionAssignedToTest.error,
    handleReload,
    handleLoading: setLoading,
  };
};

export default useGetQuestionAssignedToTest;

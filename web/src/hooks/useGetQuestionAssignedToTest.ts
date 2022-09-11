import React from 'react';
import { useGetQuestionAssignedToTestLazyQuery } from '@/generated/graphql';
import { Question } from '@/server/Models/QuestionModel';

const useGetQuestionAssignedToTest = ({
  testId,
  limit,
}: {
  testId?: string;
  limit: number;
}) => {
  const [page, setPage] = React.useState<number>(1);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [getQuestion, { loading: loadingResponse, data, fetchMore, refetch }] =
    useGetQuestionAssignedToTestLazyQuery();

  const handleLoadMore = async () => {
    const newPage = page + 1;
    setPage(newPage);
    setLoading(true);
    await fetchMore({ variables: { page: newPage, testId, limit } });
  };

  const handleReload = React.useCallback(async () => {
    if (testId) {
      setLoading(true);
      await refetch({ variables: { page, testId, limit } });
    }
  }, [testId, refetch, page, limit]);

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
    }
  }, [data]);

  React.useEffect(() => {
    setLoading(loadingResponse);
  }, [loadingResponse]);

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

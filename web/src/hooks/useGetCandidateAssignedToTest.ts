import React from 'react';
import { useGetAttendantByTestLazyQuery, Attendant } from '@/generated/graphql';

const useGetCandidateAssignedToTest = ({
  testId,
  limit,
}: {
  testId?: string;
  limit: number;
}) => {
  const defaultPage = 1;

  const [page, setPage] = React.useState<number>(defaultPage);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [getCandidate, { data, loading: loadingResponse, fetchMore, refetch }] =
    useGetAttendantByTestLazyQuery();

  const handleLoadMore = async () => {
    const newPage = page + 1;
    setPage(newPage);
    setLoading(true);
    await fetchMore({ variables: { page: newPage, limit, testId } });
  };

  const handleReload = React.useCallback(async () => {
    if (testId) {
      setLoading(true);
      setPage(defaultPage);
      await refetch({ testId, limit, page: defaultPage });
    }
  }, [testId, limit, refetch]);

  React.useEffect(() => {
    if (testId) {
      setLoading(true);
      getCandidate({ variables: { testId, limit, page } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId, getCandidate]);

  React.useEffect(() => {
    if (data && data.getAttendantByTest) {
      setLoading(false);
    }
  }, [data]);

  React.useEffect(() => {
    setLoading(loadingResponse);
  }, [loadingResponse]);

  return {
    loading,
    items: data?.getAttendantByTest.items as Attendant[],
    totalDoc: data?.getAttendantByTest.totalDocs,
    statistic: data &&
      data.getAttendantByTest && {
        inProgress: data.getAttendantByTest.inProgressDoc,
        started: data.getAttendantByTest.startedDoc,
        completed: data.getAttendantByTest.completedDoc,
      },
    handleLoadMore,
    handleReload,
    error: data?.getAttendantByTest.error,
  };
};

export default useGetCandidateAssignedToTest;

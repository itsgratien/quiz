import React from 'react';
import { useGetAttendantByTestLazyQuery, Attendant } from '@/generated/graphql';

const useGetCandidateAssignedToTest = ({
  testId,
  limit,
}: {
  testId?: string;
  limit: number;
}) => {
  const [page, setPage] = React.useState<number>(1);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [getCandidate, { data, loading: loadingResponse, fetchMore, refetch }] =
    useGetAttendantByTestLazyQuery();

  const handleLoadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    setLoading(true);
    fetchMore({ variables: { page: newPage, limit, testId } });
  };

  const handleReload = async () => {
    setLoading(true);
    await refetch();
  };

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
    statistic: {
      inProgress: data?.getAttendantByTest.inProgressDoc,
      started: data?.getAttendantByTest.startedDoc,
      completed: data?.getAttendantByTest.completedDoc,
    },
    handleLoadMore,
    handleReload,
    error: data?.getAttendantByTest.error,
  };
};

export default useGetCandidateAssignedToTest;

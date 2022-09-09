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

  const [items, setItems] = React.useState<Question[]>();

  const [totalDoc, setTotalDoc] = React.useState<number>();

  const [loading, setLoading] = React.useState<boolean>(true);

  const [reload, setReload] = React.useState<boolean>(false);

  const [getQuestion, { loading: loadingResponse, data, fetchMore }] =
    useGetQuestionAssignedToTestLazyQuery();

  const handleLoadMore = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);
    await fetchMore({ variables: { page: newPage, testId, limit } });
  };

  const handleReload = () => {};

  React.useEffect(() => {
    if (testId) {
      getQuestion({
        variables: { page, testId, limit: limit },
      });
    }
    // eslint-disable-next-line
  }, [testId, getQuestion]);

  React.useEffect(() => {
    if (
      data &&
      data.getQuestionAssignedToTest &&
      data.getQuestionAssignedToTest.items
    ) {
      setLoading(false);
      setItems(data.getQuestionAssignedToTest.items as Question[]);
    }
    if (data && data.getQuestionAssignedToTest.totalDocs) {
      setTotalDoc(data.getQuestionAssignedToTest.totalDocs);
    }
  }, [data]);

  React.useEffect(() => {
    if (loadingResponse) {
      setLoading(loadingResponse);
    }
  }, [loadingResponse]);

  return {
    loading,
    totalDoc,
    items,
    handleLoadMore,
    error: data?.getQuestionAssignedToTest.error,
    handleReload,
  };
};

export default useGetQuestionAssignedToTest;

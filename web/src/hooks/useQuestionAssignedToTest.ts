import React from 'react';
import { useGetQuestionAssignedToTestLazyQuery } from '@/generated/graphql';

const useQuestionAssignedToTest = ({ testId }: { testId?: string }) => {
  const [page, setPage] = React.useState<number>(1);

  const [getQuestion, { loading, data }] =
    useGetQuestionAssignedToTestLazyQuery();

  React.useEffect(() => {}, [testId]);
};
export default useQuestionAssignedToTest;

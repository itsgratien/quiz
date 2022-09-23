import React from 'react';
import { useGetOverralGradeLazyQuery } from '@/generated/graphql';

const useGetOverralGrade = ({
  test,
  attendant,
}: {
  test?: string;
  attendant?: string;
}) => {
  const [getOverralGradeFunc, { data, loading }] =
    useGetOverralGradeLazyQuery();

  React.useEffect(() => {
    if (test && attendant) {
      getOverralGradeFunc({ variables: { test, attendant } });
    }
  }, [test, attendant, getOverralGradeFunc]);

  return {
    loading,
    data: data?.getOverralGrade.overralgrade,
    error: data?.getOverralGrade.error,
  };
};

export default useGetOverralGrade;

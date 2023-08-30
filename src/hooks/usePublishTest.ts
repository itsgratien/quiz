import React from 'react';
import { usePublishTestMutation } from '@/generated/graphql';
import toast from 'react-hot-toast';

const usePublishTest = () => {
  const [publishTestFunc, { data, loading }] = usePublishTestMutation();

  const handlePublish = async (testId?: string) => {
    if (testId) {
      await publishTestFunc({ variables: { testId } });
    }
  };

  React.useEffect(() => {
    if (data && data.publishTest) {
      if (data.publishTest.error) {
        toast.error(data.publishTest.error);
      }
      if (data.publishTest.message) {
        toast.success(data.publishTest.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  }, [data]);

  return {
    loading,
    handlePublish,
    message: data?.publishTest.message,
    error: data?.publishTest.error,
  };
};
export default usePublishTest;

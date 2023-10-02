import React from 'react';
import {
  useAddMoreAttendantMutation,
  AddAttendantArgs,
} from '@/generated/graphql';
import { toast } from 'react-hot-toast';

const useRegisterCandidate = () => {
  const [registerAttendant, { loading, data }] = useAddMoreAttendantMutation();

  const handleSubmit = async ({
    testId,
    candidates,
  }: {
    testId?: string;
    candidates: AddAttendantArgs[];
  }) => {
    if (testId && candidates) {
      await registerAttendant({ variables: { testId, candidates } });
    }
  };

  React.useEffect(() => {
    if (data && data.addMoreAttendant) {
      if (data.addMoreAttendant.message) {
        toast.success(data.addMoreAttendant.message);
      }
      if (data.addMoreAttendant.error) {
        toast.error(data.addMoreAttendant.error);
      }
    }
  }, [data]);

  return [
    handleSubmit,
    {
      loading,
      message: data?.addMoreAttendant.message,
      error: data?.addMoreAttendant.error,
      data: data?.addMoreAttendant.items,
    },
  ];
};
export default useRegisterCandidate;

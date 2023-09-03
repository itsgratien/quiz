'use client';
import React from 'react';
import { SetupContext } from '@/contexts/SetupContext';
import SetupQuiz from './SetupQuiz/SetupQuiz';
import ViewAssignedQuestion from './View/ViewAssignedQuestion';
import ViewInvitedCandidate from './View/ViewInvitedCandidate';
import { SetupStep } from '@/generated/Enum';
import { SetupProps } from '@/generated/Shared';
import { useGetSingleTestLazyQuery, Test } from '@/generated/graphql';
import { toast } from 'react-hot-toast';

const Setup = (props: SetupProps) => {
  const [step, setStep] = React.useState<SetupStep>(SetupStep.SetupQuiz);

  const [test, setTest] = React.useState<Test>();

  const [getSingleTest, { loading, data }] = useGetSingleTestLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const handleStep = (value: SetupStep) => {
    setStep(value);
  };

  const handleTest = (values: Test) => {
    setTest(values);
  };

  React.useEffect(() => {
    if (props.slug) {
      getSingleTest({ variables: { slug: props.slug } });
    }
  }, [props.slug, getSingleTest]);

  React.useEffect(() => {
    if (data && data.getSingleTest) {
      if (data.getSingleTest.error) {
        toast.error(data.getSingleTest.error);
      }
      if (data.getSingleTest.data) {
        setTest(data.getSingleTest.data as Test);
      }
    }
  }, [data]);

  return (
    <SetupContext.Provider
      value={{
        step,
        handleStep,
        test,
        handleTest,
        loading,
      }}
    >
      <SetupContext.Consumer>
        {(value) => {
          switch (value.step) {
            case SetupStep.Question:
              return <ViewAssignedQuestion {...props} />;
            case SetupStep.Attendant:
              return <ViewInvitedCandidate {...props} />;
            default:
              return <SetupQuiz {...props} loading={loading} />;
          }
        }}
      </SetupContext.Consumer>
    </SetupContext.Provider>
  );
};
export default Setup;

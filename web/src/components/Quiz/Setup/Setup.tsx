import React from 'react';
import { SetupContext } from '@/contexts/SetupContext';
import SetupQuiz from './SetupQuiz/SetupQuiz';
import ViewAssignedQuestion from './View/ViewAssignedQuestion';
import ViewInvitedCandidate from './View/ViewInvitedCandidate';
import { SetupStep } from '@/generated/Enum';
import { SetupProps } from '@/generated/Shared';
import { useGetSingleTestLazyQuery } from '@/generated/graphql';
import { toast } from 'react-hot-toast';
import { Test } from '@/generated/graphql';

const defaultTest = {
  _id: '63185fe75a6dbf9f4e18c0bd',
  slug: 'fine-fine-school-vocabulary-1662541799354-451.57797224003497',
  title: 'Fine Fine School Vocabulary',
  endDate: '2022-09-10',
  startDate: '2022-10-20',
  subject: 'subject'
};

const Setup = (props: SetupProps) => {
  const [step, setStep] = React.useState<SetupStep>(SetupStep.SetupQuiz);

  const [test, setTest] = React.useState<Test>(defaultTest);

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
      if (data.getSingleTest.data) {
        const { data: dataResponse } = data.getSingleTest;
        setTest({
          title: dataResponse.title,
          startDate: dataResponse.startDate,
          endDate: dataResponse.endDate,
          slug: dataResponse.slug,
          subject: dataResponse.subject,
          _id: dataResponse._id,
        });
      }
      if (data.getSingleTest.error) {
        toast.error(data.getSingleTest.error);
      }
    }
  }, [data]);

  return (
    <SetupContext.Provider value={{ step, handleStep, test, handleTest }}>
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

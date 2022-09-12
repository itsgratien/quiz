import React from 'react';
import { SetupContext } from '@/contexts/SetupContext';
import SetupQuiz from './SetupQuiz/SetupQuiz';
import ViewAssignedQuestion from './View/ViewAssignedQuestion';
import ViewInvitedCandidate from './View/ViewInvitedCandidate';
import { SetupStep } from '@/generated/Enum';
import { SetupProps } from '@/generated/Shared';
import { TestInContext } from '@/generated/Quiz';

const Setup = (props: SetupProps) => {
  const [step, setStep] = React.useState<SetupStep>(SetupStep.SetupQuiz);

  const [test, setTest] = React.useState<TestInContext>({
    _id: '63185fe75a6dbf9f4e18c0bd',
    slug: 'fine-fine-school-vocabulary-1662541799354-451.57797224003497',
    title: 'Fine Fine School Vocabulary',
  });

  const handleStep = (value: SetupStep) => {
    setStep(value);
  };

  const handleTest = (values: TestInContext) => {
    setTest(values);
  };

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
              return <ViewInvitedCandidate {...props} />;
          }
        }}
      </SetupContext.Consumer>
    </SetupContext.Provider>
  );
};
export default Setup;

import React from 'react';
import { SetupContext } from '@/contexts/SetupContext';
import SetupQuiz from './SetupQuiz/SetupQuiz';
import ViewAssignedQuestion from './View/ViewAssignedQuestion';
import ViewInvitedCandidate from './View/ViewInvitedCandidate';
import { SetupStep } from '@/generated/Enum';
import { SetupProps } from '@/generated/Shared';

const Setup = (props: SetupProps) => {
  const [step, setStep] = React.useState<SetupStep>(SetupStep.SetupQuiz);

  const [testId, setTestId] = React.useState<string>();

  const handleStep = (value: SetupStep) => {
    setStep(value);
  };

  const handleTest = (value: string) => {
    setTestId(value);
  };

  return (
    <SetupContext.Provider value={{ step, handleStep, testId, handleTest }}>
      <SetupContext.Consumer>
        {(value) => {
          switch (value.step) {
            case SetupStep.Question:
              return <ViewAssignedQuestion {...props} />;
            case SetupStep.Attendant:
              return <ViewInvitedCandidate {...props} />;
            default:
              return <SetupQuiz {...props} />;
          }
        }}
      </SetupContext.Consumer>
    </SetupContext.Provider>
  );
};
export default Setup;

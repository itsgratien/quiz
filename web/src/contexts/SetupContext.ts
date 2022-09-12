import React from 'react';
import { SetupStep } from '@/generated/Enum';
import { TestInContext } from '@/generated/Quiz';

export const SetupContext = React.createContext<{
  step: SetupStep;
  handleStep?: (step: SetupStep) => void;
  test?: TestInContext;
  handleTest?: (test: TestInContext) => void;
}>({
  step: SetupStep.SetupQuiz,
});

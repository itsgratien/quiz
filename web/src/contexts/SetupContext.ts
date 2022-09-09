import React from 'react';
import { SetupStep } from '@/generated/Enum';

export const SetupContext = React.createContext<{
  step: SetupStep;
  handleStep?: (step: SetupStep) => void;
  testId?: string;
  handleTest?: (testId: string) => void;
}>({
  step: SetupStep.SetupQuiz,
});

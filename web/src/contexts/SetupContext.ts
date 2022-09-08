import React from 'react';
import { SetupStep } from '@/generated/Enum';

export const SetupContext = React.createContext<{
  step: SetupStep;
  handleStep?: (step: SetupStep) => void;
}>({
  step: SetupStep.SetupQuiz,
});

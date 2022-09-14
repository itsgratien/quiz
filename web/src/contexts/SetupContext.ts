import React from 'react';
import { SetupStep } from '@/generated/Enum';
import { Test } from '@/generated/graphql';

export const SetupContext = React.createContext<{
  step: SetupStep;
  handleStep?: (step: SetupStep) => void;
  test?: Test;
  handleTest?: (test: Test) => void;
  loading?: boolean;
}>({
  step: SetupStep.SetupQuiz,
});

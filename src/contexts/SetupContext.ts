import React from 'react';
import { SetupStep } from '@/generated/Enum';
import { Test } from '@/generated/graphql';

export const SetupContext = React.createContext<{
  step: number;
  setStep?: React.Dispatch<React.SetStateAction<number | undefined>>;
  test?: Test;
  handleTest?: (test: Test) => void;
  loading?: boolean;
}>({
  step: 0,
});

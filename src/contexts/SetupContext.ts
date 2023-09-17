import React from 'react';
import type { Test } from '@/generated/graphql';
import type {
  QuestionContextValue,
  AddMcqContextValue,
} from '@/generated/Quiz';

export const SetupContext = React.createContext<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  test?: Test;
  handleTest?: (test: Test) => void;
  loading?: boolean;
}>({
  step: 0,
  setStep: () => '',
});

export const QuestionContext = React.createContext<QuestionContextValue>({});

export const AddMcqContext = React.createContext<AddMcqContextValue>({
  step: 0,
  setStep: () => '',
});

import React from 'react';
import {
  SetupContext,
  QuestionContext,
  AddMcqContext,
} from '@/contexts/SetupContext';

export const useSetup = () => React.useContext(SetupContext);
export const useQuestion = () => React.useContext(QuestionContext);
export const useAddMcq = () => React.useContext(AddMcqContext);
export default useSetup;

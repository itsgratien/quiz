import React from 'react';
import { AttendantStatus } from '@/generated/Enum';
import { Attendant, Test } from '@/generated/graphql';

export const TodoContext = React.createContext<{
  status?: AttendantStatus | string;
  loading?: boolean;
  attendant?: Attendant;
  test?: Test;
  numberOfQuestions?: number;
  error?: string;
  changeStatus?: (value: string) => void;
  authError?: string;
  questionId?: string;
  toggleQuestionId?: (value: string) => void;
  query?: {
    test: string;
    attendant: string;
  };
}>({});

export default TodoContext;

// steps to do quiz
// - verify user
// - if user is available, allow them to continue
// if not display error message

// what happen when the user is available
// check if status is inProgress
// when test is inProgress
//
/**
 * - display the test details including questions, candidate information etc
 */

// when test is completed
/**
 * - display message that he/she completed the test
 */

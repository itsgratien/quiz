import React from 'react';
import { AttendantStatus } from '@/generated/Enum';

export const DoQuizContext = React.createContext<{
  status?: AttendantStatus;
  loading?: boolean;
}>({});

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

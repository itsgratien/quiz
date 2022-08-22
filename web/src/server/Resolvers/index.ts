import { UserResolver } from './UserResolver';
import { TestResolver } from './TestResolver';
import { QuestionResolver } from './QuestionResolver';
import { AttendantResolver } from './AttendantResolver';
import { AnswerResolver } from './AnswerResolver';

export const resolvers = [
  UserResolver,
  TestResolver,
  QuestionResolver,
  AttendantResolver,
  AnswerResolver,
] as const;

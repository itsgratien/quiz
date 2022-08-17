import { UserResolver } from './UserResolver';
import { TestResolver } from './TestResolver';
import { QuestionResolver } from './QuestionResolver';
import { AttendantResolver } from './AttendantResolver';

export const resolvers = [
  UserResolver,
  TestResolver,
  QuestionResolver,
  AttendantResolver,
] as const;

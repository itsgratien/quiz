import { UserResolver } from './UserResolver';
import { TestResolver } from './TestResolver';
import { QuestionResolver } from './QuestionResolver';

export const resolvers = [
  UserResolver,
  TestResolver,
  QuestionResolver,
] as const;

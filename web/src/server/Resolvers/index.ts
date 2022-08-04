import { UserResolver } from './UserResolver';
import { TestResolver } from './TestResolver';

export const resolvers = [UserResolver, TestResolver] as const;

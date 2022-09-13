import { User, Test } from './graphql';

export enum QuizStatus {
  Published = 'Published',
  Draft = 'Draft',
}

export enum QuestionTypeEnum {
  MCQ = 'Multiple Choice', // Multiple Choice Question
  VQ = 'Video Question', // Video question
  SQ = 'SQ', // Special Question
}

export interface UseQuizStatusColorPropsT {
  status?: string;
}

// new
export interface QuizPageProps {
  me: User;
}

export interface QuizDetailPageProps {
  loading?: boolean;
  data?: Test;
}

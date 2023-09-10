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

export interface QuizPageProps {
  me: User;
}

export interface QuizDetailPageProps {
  loading?: boolean;
  data?: Test;
}

export interface QuestionContextValue {
  openMcq?: boolean;
  setOpenMcq?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddMcqValues {
  title: string;
  points: string;
  choiceType: string;
  choices: string[];
  description: string;
  choiceNumber: number;
  answers: string[];
}

export interface AddMcqContextValue {
  step?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}

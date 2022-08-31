import { CustomModalPropsT } from './Shared';

export enum QuizStatus {
  Published = 'Published',
  Draft = 'Draft',
}

export enum QuestionTypeEnum {
  MCQ = 'Multiple Choice', // Multiple Choice Question
  VQ = 'Video Question', // Video question
  SQ = 'SQ', // Special Question
}

export interface PeopleT {
  _id: string;
  names: string;
  answerUri?: string;
  email: string;
  quizUri: string;
}

export interface UseQuizStatusColorPropsT {
  status: string;
}

export interface SectionHeaderPropsT {
  title: string;
  handleAdd?: () => void;
}

export interface PeopleItemPropsT {
  item: PeopleT;
}

export interface QuestionT {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  owner: string;
  status?: QuizStatus;
  type?: QuestionTypeEnum;
  choices?: string[];
  time: number;
}

export interface QuestionItemPropsT {
  item: QuestionT;
}

export interface SetupQuizPropsT extends CustomModalPropsT {}
export interface SetupHeaderPropsT {
  title: string;
  onClose: () => void;
}

// new
export interface QuizPageProps {
  me: any;
}

export interface StatItemProps {
  title: string;
  number: number;
}

export interface QuizItemProps {
  item: {
    name: string;
    status: QuizStatus;
    _id: string;
  };
}

export interface QuizModalContainerT {
  open: boolean;
  handleClose?: () => void;
}

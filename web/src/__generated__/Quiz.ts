export enum QuizStatus {
  Published = 'Published',
  Draft = 'Draft',
}

export enum QuestionTypeEnum {
  MCQ = 'MCQ', // Multiple Choice Question
  VQ = 'VQ', // Video question
  SQ = 'SQ', // Special Question
}

export interface PeopleT {
  _id: string;
  names: string;
  answerUri?: string;
  email: string;
  quizUri: string;
}

export interface QuizItemT {
  _id: string;
  name: string;
  status: QuizStatus;
  left?: number;
  createdAt: string;
}

export interface QuizT extends QuizItemT {
  managerId: string;
  peoples: PeopleT[];
  passMark: number;
  startDate: string;
  endDate: string;
  updatedAt: string;
}

export interface UseQuizStatusColorPropsT {
  status: string;
}

export interface QuizItemPropsT {
  item: QuizItemT;
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

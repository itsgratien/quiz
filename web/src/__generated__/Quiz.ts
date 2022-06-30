export enum QuizStatus {
  Published = 'Published',
  Draft = 'Draft',
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

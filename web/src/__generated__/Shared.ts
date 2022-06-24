import React from 'react';

export interface TLayoutProps {
  children: React.ReactNode;
}

export interface TListItemProps {
  name: string;
  icon: string;
}

export interface QuizItemPropsT {
  item: QuizItemT;
}

export interface QuizItemT {
  _id: string;
  name: string;
  status: string;
  date: string;
  left?: number;
}

export interface UseQuizStatusColorPropsT {
  status: string;
}

export enum QuizStatus {
  Published = 'Published',
  Draft = 'Draft',
}

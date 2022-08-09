import React from 'react';
import { answerModel } from '@/server/Models/AnswerModel';
import { questionModel } from '@/server/Models/QuestionModel';
import { userModel } from '@/server/Models/UserModel';
import { testModel } from '@/server/Models/TestModel';
import { Attendant } from '@/server/Models/AttendantModel';

export interface TLayoutProps {
  children: React.ReactNode;
}

export interface TListItemProps {
  name: string;
  icon: string;
}

export interface CustomModalPropsT {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export type ModelType = typeof userModel | typeof answerModel | typeof questionModel;

export interface PaginationArg {
  limit: number;
  page: number;
}

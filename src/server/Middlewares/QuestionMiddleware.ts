import { MiddlewareFn } from 'type-graphql';
import { questionModel } from '../Models/QuestionModel';
import * as UserType from '@/generated/User';
import { errorResponse } from '../Helpers/SharedHelper';

export const verifyQuestionOwner: MiddlewareFn<UserType.ContextT> = async (
  { context, args },
  next
) => {
  const { req } = context;
  const find = await questionModel.findOne({
    $and: [{ _id: args.id }, { owner: req.session.userId }],
  });

  if (find) {
    return next();
  }
  return errorResponse('You are not allowed to perform this action');
};

export const verifyQuestion: MiddlewareFn<UserType.ContextT> = async (
  { args },
  next
) => {
  const find = await questionModel.findOne({ _id: args.questionId });

  if (find) {
    return next();
  }
  return errorResponse('You are not allowed to perform this action');
};

import { MiddlewareFn } from 'type-graphql';
import { ContextT } from '@/generated/User';
import { testModel } from '@/server/Models/TestModel';
import { errorResponse } from '@/server/Helpers/SharedHelper';

export const verifyTest: MiddlewareFn<ContextT> = async ({ args }, next) => {
  console.log('abana', args);
  const { testId } = args;

  const findTest = await testModel.findById(testId);

  if (!findTest) {
    return errorResponse('Test Not Found');
  }
  return next();
};

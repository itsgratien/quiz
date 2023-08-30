import { MiddlewareFn } from 'type-graphql';
import { errorResponse } from '@/server/Helpers/SharedHelper';
import { testModel } from '@/server/Models/TestModel';
import { attendantModel } from '@/server/Models/AttendantModel';
import { compareAsc } from 'date-fns';
import { ContextT } from '@/generated/User';
import { cryptr } from '../Helpers/AttendantHelper';

export const verifyTestUri: MiddlewareFn<ContextT> = async (
  { args, context },
  next,
) => {
  const { req } = context;

  if (req.session && req.session.userId) {
    return errorResponse('You are not allowed to perform this action');
  }

  if (!args.test || !args.attendant) {
    return errorResponse('Quiz Not Found');
  }

  const testId = cryptr.decrypt(args.test);

  const attendantId = cryptr.decrypt(args.attendant);

  const findTest = await testModel.findById(testId);

  const findAttendant = await attendantModel.findById(attendantId);

  if (!findTest || !findAttendant) {
    return errorResponse('Quiz Not Found');
  }

  const compareEndDate = compareAsc(new Date(), new Date(findTest.endDate));

  if (compareEndDate === 1) {
    return errorResponse('Quiz Was Expired');
  }
  return next();
};

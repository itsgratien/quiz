import { MiddlewareFn } from 'type-graphql';
import { errorResponse } from '@/server/Helpers/SharedHelper';
import { testModel } from '@/server/Models/TestModel';
import { attendantModel } from '@/server/Models/AttendantModel';
import { compareAsc } from 'date-fns';
import { decryptFunc } from '@/server/Helpers/SharedHelper';

export const verifyTestUri: MiddlewareFn = async ({ args }, next) => {
  if (!args.test || !args.attendant) {
    return errorResponse('Quiz Not Found');
  }

  const testId = decryptFunc(args.test);

  const attendantId = decryptFunc(args.attendant);

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

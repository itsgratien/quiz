import { MiddlewareFn } from 'type-graphql';
import * as UserType from '@/generated/User';
import { errorResponse } from '@/server/Helpers/SharedHelper';
import { testModel } from '@/server/Models/TestModel';
import { questionModel } from '@/server/Models/QuestionModel';
import { attendantModel } from '@/server/Models/AttendantModel';
import { HttpCode } from '@/utils/HttpCode';

export const verifyArgs: MiddlewareFn<UserType.ContextT> = async (
  { args },
  next
) => {
  try {
    const checkTest = await testModel.findById(args.test);

    if (!checkTest) {
      return errorResponse('Test Not Found');
    }
    const checkQuestion = await questionModel.findById(args.question);

    const findTestQuestion =
      checkTest.questions?.find((item) => item.question === args.question) ??
      undefined;

    if (!checkQuestion || !findTestQuestion) {
      return errorResponse('Question Not Found');
    }

    const checkAttendant = await attendantModel.findOne({
      $and: [{ _id: args.attendant }, { testId: checkTest._id }],
    });

    const checkTestAttendant =
      checkTest.attendants?.find((item) => item.attendant === args.attendant) ??
      undefined;

    if (!checkAttendant || !checkTestAttendant) {
      return errorResponse('You are not allowed to do test');
    }

    return next();
  } catch (error: any) {
    return errorResponse(error.message, HttpCode.ServerError);
  }
};

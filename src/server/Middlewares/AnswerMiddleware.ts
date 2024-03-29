import { MiddlewareFn } from 'type-graphql';
import * as UserType from '@/generated/User';
import { errorResponse } from '@/server/Helpers/SharedHelper';
import { testModel } from '@/server/Models/TestModel';
import { questionModel } from '@/server/Models/QuestionModel';
import { attendantModel } from '@/server/Models/AttendantModel';
import { HttpCode } from '@/utils/HttpCode';
import { cryptr } from '@/server/Helpers/AttendantHelper';
import { answerModel } from '@/server/Models/AnswerModel';

export const verifyArgs: MiddlewareFn<UserType.ContextT> = async (
  { args },
  next,
) => {
  try {
    const testId = cryptr.decrypt(args.test);

    const attendantId = cryptr.decrypt(args.attendant);

    const checkTest = await testModel.findById(testId);

    if (!checkTest) {
      return errorResponse('Test Not Found');
    }
    const checkQuestion = await questionModel.findById(args.question);

    const findTestQuestion =
      checkTest.questions?.find(
        (item) => String(item.question) === args.question,
      ) ?? undefined;

    if (!checkQuestion || !findTestQuestion) {
      return errorResponse('Question Not Found');
    }

    const checkAttendant = await attendantModel.findOne({
      $and: [{ _id: attendantId }, { testId: checkTest._id }],
    });

    const checkTestAttendant =
      checkTest.attendants?.find((item) => item.attendant === attendantId) ??
      undefined;

    if (!checkAttendant || !checkTestAttendant) {
      return errorResponse('You are not allowed to do test');
    }

    const checkDuplicateAnswer = await answerModel.findOne({
      $and: [
        { question: checkQuestion._id },
        { test: testId },
        { attendant: attendantId },
      ],
    });

    if (checkDuplicateAnswer) {
      return errorResponse('Question Already Answered');
    }

    return next();
  } catch (error) {
    return errorResponse(undefined, HttpCode.ServerError);
  }
};

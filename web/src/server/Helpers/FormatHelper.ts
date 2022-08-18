import { QuestionDocument, Question } from '@/server/Models/QuestionModel';
import { User, UserDocument } from '@/server/Models/UserModel';
import { Attendant, AttendantDocument } from '@/server/Models/AttendantModel';
import { Test, TestDocument } from '@/server/Models/TestModel';
import { pick } from 'lodash';

export class FormatHelper {
  getQuestion(
    value: QuestionDocument | Question,
    showOwner?: boolean
  ): Question {
    return {
      _id: value._id,
      title: value.title,
      choices: value.choices,
      description: value.description,
      slug: value.slug,
      status: value.status,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      type: value.type,
      owner:
        typeof value.owner === 'object' && showOwner
          ? (this.getQuestionOwner(value.owner, [
              'names',
              'username',
              '_id',
              'email',
            ]) as User)
          : undefined,
    };
  }

  getQuestionOwner = (value: User, fields: string[]): Partial<User> =>
    pick(value, fields);

  getUser(value: User | UserDocument): User {
    return {
      _id: value._id,
      username: value.username,
      email: value.email,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      profilePicture: value.profilePicture,
      slug: value.slug,
      role: value.role,
    };
  }

  getAttendant(value: Attendant | AttendantDocument): Attendant {
    return {
      _id: value._id,
      names: value.names,
      email: value.email,
      phoneNumber: value.phoneNumber,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      testUri: value.testUri,
      testId:
        typeof value.testId === 'string' ? String(value.testId) : value.testId,
      status: value.status,
    };
  }

  getTest(values: Test | TestDocument, allowManagerInfo?: boolean) {
    return {
      _id: values._id,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
      subject: values.subject,
      title: values.title,
      description: values.description,
      status: values.status,
      startDate: values.startDate,
      endDate: values.endDate,
      passMark: values.passMark,
      managerId: allowManagerInfo ? values.managerId : undefined,
      questions: values.questions,
      attendants: values.attendants,
    };
  }
}
export default new FormatHelper();

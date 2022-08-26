import { Question } from '@/server/Models/QuestionModel';
import { User } from '@/server/Models/UserModel';
import { Attendant } from '@/server/Models/AttendantModel';
import { Test } from '@/server/Models/TestModel';
import { pick } from 'lodash';

export class FormatHelper {
  getQuestion(value: Question, showOwner?: boolean): Question {
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
      points: value.points,
    };
  }

  getQuestionOwner = (value: User, fields: string[]): Partial<User> =>
    pick(value, fields);

  getUser(value: User): User {
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

  getAttendant(value: Attendant): Attendant {
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

  getTest(values: Test, allowManagerInfo?: boolean) {
    const { questions, attendants } = values;
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
      questions:
        questions &&
        questions.length > 0 &&
        questions.map((item) => ({
          question:
            typeof item.question === 'object' &&
            this.getQuestion(item.question),
        })),
      attendants:
        attendants &&
        attendants.length > 0 &&
        attendants.map((item) => ({
          attendant:
            typeof item.attendant === 'object' &&
            this.getAttendant(item.attendant),
        })),
    };
  }
}
export default new FormatHelper();

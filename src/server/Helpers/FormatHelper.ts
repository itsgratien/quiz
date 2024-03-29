import { Question } from '@/server/Models/QuestionModel';
import { User } from '@/server/Models/UserModel';
import { Attendant } from '@/server/Models/AttendantModel';
import { Test } from '@/server/Models/TestModel';
import { pick } from 'lodash';
import { TestQuestion, TestAttendant } from '../Models/TestModel';
import { get } from 'lodash';
import mongoose from 'mongoose';
import { AttendantRefTest } from '@/server/Models/AttendantModel';
import { Answer } from '@/server/Models/AnswerModel';

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
      solutions: value.solutions,
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

  getAttendant(value: Attendant, refTest?: AttendantRefTest): Attendant {
    return {
      _id: value._id,
      names: value.names,
      email: value.email,
      phoneNumber: value.phoneNumber,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      testUri: value.testUri,
      testId: value.testId
        ? mongoose.Types.ObjectId.isValid(value.testId as string)
          ? String(value.testId)
          : get(value.testId, '_id')
        : undefined,
      status: value.status,
      test: refTest && {
        _id: refTest._id,
        title: refTest.title,
        status: refTest.status,
      },
      image: value.image,
    };
  }

  getTestQuestions(questions?: TestQuestion[]) {
    if (questions && questions.length > 0) {
      const d = questions.map((item) => ({
        question: this.getQuestion(item.question as any),
      }));
      return d;
    }
    return undefined;
  }

  getTestCandidates(attendants?: TestAttendant[]) {
    if (attendants && attendants.length > 0) {
      const candidates = attendants.map((item) => ({
        attendant: this.getAttendant(item.attendant as any),
      }));

      return candidates;
    }
    return undefined;
  }

  getTest(values: Test, allowManagerInfo?: boolean): Test {
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
      managerId: allowManagerInfo ? values.managerId : undefined,
      questions: this.getTestQuestions(values.questions),
      attendants: this.getTestCandidates(values.attendants),
      slug: values.slug,
    };
  }

  getAnswer(value: Answer): Answer {
    return {
      _id: value._id,
      test: value.test,
      attendant: value.attendant,
      question: value.question,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      answers: value.answers,
      grade: value.grade,
      questionId: this.generateId(value.question),
      attendantId: this.generateId(value.attendant),
      testId: this.generateId(value.test),
    };
  }

  private generateId(value: any) {
    if (new mongoose.Types.ObjectId(value)) {
      return String(value);
    }

    return value;
  }
}
export default new FormatHelper();

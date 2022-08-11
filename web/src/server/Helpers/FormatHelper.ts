import { QuestionDocument, Question } from '@/server/Models/QuestionModel';
import { User, UserDocument } from '@/server/Models/UserModel';
import { pick } from 'lodash';

export class FormatHelper {
  getQuestion(value: QuestionDocument | Question, showOwner?: boolean): Question {
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
}
export default new FormatHelper();

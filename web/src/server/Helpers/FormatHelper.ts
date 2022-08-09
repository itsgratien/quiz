import { QuestionDocument, Question } from '@/server/Models/QuestionModel';

export class FormatHelper {
  getQuestion(value: QuestionDocument): Question {
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
      owner: typeof value.owner === 'object' ? value.owner : undefined,
    };
  }
}
export default new FormatHelper();

import { faker } from '@faker-js/faker';
import { QuestionTypeEnum } from '@/generated/Quiz';

const question = {
  getAll: [
    {
      title: faker.lorem.paragraph(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
    },
  ],
};
export default question;

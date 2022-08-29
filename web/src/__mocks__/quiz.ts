import { faker } from '@faker-js/faker';
import { QuizStatus } from '@/generated/Quiz';

const quiz = {
  getAll: [
    {
      _id: Math.random().toString(),
      name: faker.random.words(),
      status: QuizStatus.Published,
    },
    {
      _id: Math.random().toString(),
      name: faker.random.words(),
      status: QuizStatus.Draft,
    },
    {
      _id: Math.random().toString(),
      name: faker.random.words(),
      status: QuizStatus.Published,
    },
    {
      _id: Math.random().toString(),
      name: faker.random.words(),
      status: QuizStatus.Draft,
    },
  ],
};

export default quiz;

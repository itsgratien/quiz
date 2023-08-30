import { faker } from '@faker-js/faker';
import { QuizStatus } from '@/generated/Quiz';

export const defaultTest = {
  _id: '63185fe75a6dbf9f4e18c0bd',
  slug: 'fine-fine-school-vocabulary-1662541799354-451.57797224003497',
  title: 'Fine Fine School Vocabulary',
  endDate: '2022-09-10',
  startDate: '2022-10-20',
  subject: 'subject',
};

const quiz = {
  getAll: [
    {
      _id: Math.random().toString(),
      name: faker.lorem.words(),
      status: QuizStatus.Published,
    },
    {
      _id: Math.random().toString(),
      name: faker.lorem.words(),
      status: QuizStatus.Draft,
    },
    {
      _id: Math.random().toString(),
      name: faker.lorem.words(),
      status: QuizStatus.Published,
    },
    {
      _id: Math.random().toString(),
      name: faker.lorem.words(),
      status: QuizStatus.Draft,
    },
  ],
};

export default quiz;

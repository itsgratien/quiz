import { faker } from '@faker-js/faker';
import question from './Question';

const answer = {
  getAll: [
    {
      _id: Math.random().toString(),
      question: question.getAll[0],
      answers: [
        'On Deploying Application to AWS',
        'Testing User Interface Design',
      ],
      grade: faker.random.numeric(),
    },
    {
      _id: Math.random().toString(),
      question: question.getAll[1],
      answers: [faker.random.words(), faker.lorem.paragraphs(40)],
      grade: faker.random.numeric(),
    },
    {
      _id: Math.random().toString(),
      question: question.getAll[2],
      answers: [faker.random.words(), faker.lorem.paragraphs(40)],
      grade: faker.random.numeric(),
    },
    {
      _id: Math.random().toString(),
      question: question.getAll[3],
      answers: [faker.random.words(), faker.lorem.paragraphs(40)],
      grade: faker.random.numeric(),
    },
  ],
};
export default answer;

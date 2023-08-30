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
      grade: faker.number.int()
    },
    {
      _id: Math.random().toString(),
      question: question.getAll[1],
      answers: ['Tanzania Dodoma', 'Kibuye', 'Gisenyi'],
      grade: faker.number.int(),
    },
    {
      _id: Math.random().toString(),
      question: question.getAll[2],
      answers: ['Tanzania', 'Kigali Rwanda'],
      grade: faker.number.int(),
    },
    {
      _id: Math.random().toString(),
      question: question.getAll[3],
      answers: ['Gisenyi', 'Kigali', 'Tanzania'],
      grade: faker.number.int(),
    },
  ],
};
export default answer;

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
      answers: ['Tanzania Dodoma', 'Kibuye', 'Gisenyi'],
      grade: faker.random.numeric(),
    },
    {
      _id: Math.random().toString(),
      question: question.getAll[2],
      answers: ['Tanzania', 'Kigali Rwanda'],
      grade: faker.random.numeric(),
    },
    {
      _id: Math.random().toString(),
      question: question.getAll[3],
      answers: ['Gisenyi', 'Kigali', 'Tanzania'],
      grade: faker.random.numeric(),
    },
  ],
};
export default answer;

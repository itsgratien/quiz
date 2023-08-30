import { faker } from '@faker-js/faker';
import { QuestionTypeEnum } from '@/generated/Quiz';

const question = {
  getAll: [
    {
      title: faker.lorem.words(5),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(2),
      choices: [
        'On Deploying Application to AWS',
        'Testing User Interface Design',
        'Inyarwanda',
      ],
      answers: ['On Deploying Application to AWS'],
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(2),
      choices: ['Kigali Rwanda', 'Tanzania Dodoma', 'Gisenyi', 'Kibuye'],
      answers: ['Kibuye', 'Gisenyi', 'Kigali Rwanda'],
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(3),
      choices: ['Kigali Rwanda', 'Tanzania', 'Gisenyi', 'Kibuye'],
      answers: ['Tanzania'],
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(3),
      choices: ['Kigali', 'Tanzania', 'Gisenyi', 'Kibuye'],
      answers: ['Gisenyi', 'Kigali'],
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(2),
      choices: ['Kigali', 'Tanzania', 'Gisenyi', 'Kibuye'],
      answers: ['Gisenyi', 'Kigali'],
    },
  ],
};
export default question;

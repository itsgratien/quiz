import { faker } from '@faker-js/faker';
import { QuestionTypeEnum } from '@/generated/Quiz';

const question = {
  getAll: [
    {
      title: faker.lorem.paragraph(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(2),
      choices: [
        'On Deploying Application to AWS',
        faker.random.words(),
        faker.random.words(),
        faker.random.words(),
        'Testing User Interface Design',
      ],
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(2),
      choices: [
        faker.lorem.paragraph(1),
        faker.lorem.paragraph(1),
        faker.lorem.paragraph(1),
      ],
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(3),
      choices: [
        faker.random.words(),
        faker.random.words(),
        faker.random.words(),
      ],
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(100),
      choices: [
        faker.random.words(),
        faker.random.words(),
        faker.random.words(),
      ],
    },
    {
      title: faker.random.words(),
      type: QuestionTypeEnum.MCQ,
      _id: Math.random().toString(),
      points: faker.random.numeric(),
      description: faker.lorem.paragraphs(100),
      choices: [
        'On Deploying Application to AWS',
        faker.random.words(),
        faker.random.words(),
        faker.random.words(),
      ],
    },
  ],
};
export default question;

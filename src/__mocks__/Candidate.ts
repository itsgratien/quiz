import { faker } from '@faker-js/faker';
import { AttendantStatus } from '@/generated/Enum';

const candidate = {
  getAll: [
    {
      names: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      _id: Math.random().toString(),
      status: AttendantStatus.Completed,
    },
    {
      names: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      _id: Math.random().toString(),
      status: AttendantStatus.Started,
    },
    {
      names: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      _id: Math.random().toString(),
      status: AttendantStatus.Completed,
    },
    {
      names: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      _id: Math.random().toString(),
      status: AttendantStatus.InProgress,
    },
    {
      names: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      _id: Math.random().toString(),
      status: AttendantStatus.Completed,
    },
    {
      names: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      _id: Math.random().toString(),
      status: AttendantStatus.Started,
    },
  ],
};
export default candidate;

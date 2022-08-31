import { object, string } from 'yup';

const requiredMsg = `This field can't be left blank`;

const minLengthMsg = (value: number) =>
  `This field can't accept below ${value} characters`;

export const SetupQuizSchema = object().shape({
  name: string().required(requiredMsg).min(4, minLengthMsg(4)),
  startDate: string().required(requiredMsg),
  endDate: string().required(requiredMsg),
  subject: string().required(requiredMsg),
});

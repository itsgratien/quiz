import { object, string } from 'yup';

const requiredMessage = `This field can't be left blank`;

export const SetupQuizSchema = object().shape({
  name: string().required(requiredMessage),
  startDate: string().required(requiredMessage),
  endDate: string().required(requiredMessage),
  passMark: string().required(requiredMessage),
});

import { object, string } from 'yup';
import { requiredMsg, minLengthMsg } from '@/utils/ValidationMsg';

export const SetupQuizSchema = object().shape({
  name: string().required(requiredMsg).min(4, minLengthMsg(4)),
  startDate: string().required(requiredMsg),
  endDate: string().required(requiredMsg),
  subject: string().required(requiredMsg),
});

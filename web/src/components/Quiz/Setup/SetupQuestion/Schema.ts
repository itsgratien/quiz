import { object, string, number } from 'yup';
import { requiredMsg, minLengthMsg } from '@/utils/ValidationMsg';

export const SetupQuestionSchema = object().shape({
  title: string().required(requiredMsg),
  points: number()
    .required(requiredMsg)
    .positive('This field must be a positive number'),
  choiceType: string().required(requiredMsg),
  choiceNumber: string().required(requiredMsg),
});

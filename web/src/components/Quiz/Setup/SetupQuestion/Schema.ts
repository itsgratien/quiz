import { object, string, number, array } from 'yup';
import { requiredMsg, minLengthMsg } from '@/utils/ValidationMsg';

export const SetupQuestionSchema = object().shape({
  title: string().required(requiredMsg).min(5, minLengthMsg(5)),
  points: number()
    .required(requiredMsg)
    .positive('This field must be a positive number'),
  choiceType: string().required(requiredMsg),
  choiceNumber: string().required(requiredMsg),
  choices: array()
    .of(string().required(requiredMsg))
    .required(requiredMsg)
    .min(2, requiredMsg),
  answers: array()
    .of(string().required(requiredMsg))
    .required(requiredMsg)
    .min(1, requiredMsg),
});

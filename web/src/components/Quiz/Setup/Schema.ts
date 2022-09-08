import { object, string, number } from 'yup';
import { requiredMsg, minLengthMsg } from '@/utils/ValidationMsg';

export const SetupQuizSchema = object().shape({
  title: string().required(requiredMsg).min(4, minLengthMsg(4)),
  startDate: string().required(requiredMsg),
  endDate: string().required(requiredMsg),
  subject: string().required(requiredMsg),
});

export const SetupAttendantSchema = object().shape({
  names: string().required(requiredMsg).min(4, minLengthMsg(4)),
  email: string().required(requiredMsg).email('Email must be valid'),
  phoneNumber: number()
    .required(requiredMsg)
    .positive('Phone number must be positive')
    .min(10, minLengthMsg(10)),
});

import { object, string, number, addMethod, date } from 'yup';
import { requiredMsg, minLengthMsg } from '@/utils/ValidationMsg';

// addMethod(date, 'customDate', function customDate() {});

export const SetupQuizSchema = object().shape({
  title: string().required(requiredMsg).min(4, minLengthMsg(4)),
  startDate: string().required(requiredMsg),
  endDate: string().required(requiredMsg),
  subject: string().required(requiredMsg),
  passMark: number()
    .required(requiredMsg)
    .integer('This field must be integer')
    .positive('This field must be positive'),
});

export const SetupAttendantSchema = object().shape({
  names: string().required(requiredMsg).min(4, minLengthMsg(4)),
  email: string().required(requiredMsg).email('Email must be valid'),
  phoneNumber: number()
    .required(requiredMsg)
    .positive('Phone number must be positive')
    .min(10, minLengthMsg(10)),
});

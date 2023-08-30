import { object, string } from 'yup';

const required = `This field can't be left blank`;

export const loginSchema = object().shape({
  email: string().required(required).email('Email must be valid'),
  password: string().required(required),
});

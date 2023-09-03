import { Metadata } from 'next';
import Login from '@/components/Auth/Login';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Sign In to your account',
};

const Auth = () => {
  return <Login />;
};
export default Auth;

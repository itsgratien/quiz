import Head from 'next/head';
import Login from '@/components/Auth/Login';

const Auth = () => {
  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <Login />
    </>
  );
};
export default Auth;

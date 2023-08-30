import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import style from '../styles/Auth.module.scss';
import classname from 'classnames';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Login } from '@/components/Auth/Login';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import * as UserType from '@/generated/User';
import { useAuthenticateMutation } from '@/generated/graphql';

const Auth: NextPage = () => {
  const [withEmailPassword, setWithEmailPassword] =
    React.useState<boolean>(false);

  const [error, setError] = React.useState<string>();

  const auth = getAuth();

  const router = useRouter();

  const [authenticate] = useAuthenticateMutation();

  const provider = new GoogleAuthProvider();

  const authenticateFunc = async () => {
    const user = auth.currentUser;

    const idToken = await user?.getIdToken();

    if (idToken) {
      await authenticate({ variables: { idToken } });
      return router.push('/m/quiz');
    }
  };
  const handleLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(res);
      return authenticateFunc();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLoginWithEmailAndPassword = async (
    values: UserType.LoginParamT
  ) => {
    try {
      setError(undefined);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      return authenticateFunc();
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Auth</title>
        <meta name="description" content="Quiz App" />
        <meta name="author" content="Gratien Tuyishimire" />
      </Head>
      <main className={style.main}>
        <div className={style.logo}>
          <Image src="/logo.png" alt="" width={80} height={80} />
        </div>
        <div className={classname('bg-white', style.auth)}>
          <span className={classname('font-bold', style.title)}>Login</span>
          <div className={classname('relative flex', style.buttons)}>
            <button
              type="button"
              className={classname('outline-none focus:outline-none')}
              onClick={handleLoginWithGoogle}
            >
              <Icon icon="ion:logo-google" fontSize={40} />
              <span>Using google</span>
            </button>
            <button
              type="button"
              className={classname('outline-none focus:outline-none')}
              onClick={() => setWithEmailPassword(true)}
            >
              <Icon icon="arcticons:lock" fontSize={40} />
              <span>Using email & password</span>
            </button>
          </div>
        </div>
      </main>
      {withEmailPassword && (
        <Login
          open={withEmailPassword}
          handleClose={() => setWithEmailPassword(false)}
          handleSubmit={handleLoginWithEmailAndPassword}
          error={error}
        />
      )}
    </>
  );
};
export default Auth;

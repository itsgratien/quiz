import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import style from '../styles/Auth.module.scss';
import classname from 'classnames';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuthenticateMutation } from '@/generated/graphql';

const Auth: NextPage = () => {
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
          </div>
        </div>
      </main>
    </>
  );
};
export default Auth;

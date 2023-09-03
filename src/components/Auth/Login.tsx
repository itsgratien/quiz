'use client';
import React from 'react';
import cn from 'classnames';
import styles from './Auth.module.scss';
import { Icon } from '@iconify/react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthenticateMutation } from '@/generated/graphql';

const Login = () => {
  const [error, setError] = React.useState<string>();

  const router = useRouter();

  const [authenticate] = useAuthenticateMutation();

  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  const authenticateFunc = async () => {
    const user = auth.currentUser;

    const idToken = await user?.getIdToken();

    if (idToken) {
      await authenticate({ variables: { idToken } });
      return router.push('/m/quiz');
    }
  };

  const onLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(res);
      return authenticateFunc();
    } catch (error: any) {
      setError('Sign In failed try again');
    }
  };

  return (
    <div className={cn(styles.login, 'w-full min-h-screen')}>
      <div className={cn('ml-12')}>
        <Image src={'/logo.svg'} width={80} height={80} alt="logo" />
      </div>
      <div className={cn('bg-white', styles.container)}>
        <span className={cn('font-bold', styles.title)}>Login</span>
        <div className={cn('relative flex items-center')}>
          <Button
            icon={<Icon icon="ion:logo-google" fontSize={40} />}
            type="primary"
            onClick={onLoginWithGoogle}
            size="large"
            className={cn(
              'border-none !flex items-center justify-center !text-black !font-bold',
              styles.loginBtn,
            )}
          >
            using google
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;

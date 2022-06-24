import type { NextPage } from 'next';
import Head from 'next/head';
import style from '../styles/Auth.module.scss';
import classname from 'classnames';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const Auth: NextPage = () => {
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
            >
              <Icon icon="ion:logo-google" fontSize={40} />
              <span>Using google</span>
            </button>
            <button
              type="button"
              className={classname('outline-none focus:outline-none')}
            >
              <Icon icon="arcticons:lock" fontSize={40} />
              <span>Using email & password</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
export default Auth;

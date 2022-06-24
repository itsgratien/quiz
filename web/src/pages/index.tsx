import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/auth')
  }, [router]);

  return (
    <>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Quiz App" />
        <meta name="author" content='Gratien Tuyishimire' />
      </Head>
      <main className={styles.main}>
      </main>
    </>
  );
};

export default Home;

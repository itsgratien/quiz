import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Quiz App" />
        <meta name="author" content='Gratien Tuyishimire'/>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <h1>Hello world</h1>
      </main>
    </div>
  );
};

export default Home;

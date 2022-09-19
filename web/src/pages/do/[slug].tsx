import React from 'react';
import Head from 'next/head';
import StartQuiz from '@/components/Quiz/TodoQuiz/Start/Start';
import { DoQuizContext } from '@/contexts/DoQuizContext';

const DoQuiz = () => {
  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <StartQuiz />
    </>
  );
};

export default DoQuiz;

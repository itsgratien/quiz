import React from 'react';
import Head from 'next/head';
import StartQuiz from '@/components/Quiz/TodoQuiz/Start/Start';
import { TodoContext } from '@/contexts/TodoContext';
import { AttendantStatus } from '@/generated/Enum';
import Todo from '@/components/Quiz/TodoQuiz/CandidateQuiz/CandidateQuiz';

const DoQuiz = () => {
  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <TodoContext.Provider value={{ status: AttendantStatus.InProgress }}>
        <TodoContext.Consumer>
          {({ status }) => {
            switch (status) {
              case AttendantStatus.InProgress:
                return <Todo />;
              default:
                return <StartQuiz />;
            }
          }}
        </TodoContext.Consumer>
      </TodoContext.Provider>
    </>
  );
};

export default DoQuiz;

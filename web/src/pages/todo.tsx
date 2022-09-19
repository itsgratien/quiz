import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import StartQuiz from '@/components/Quiz/TodoQuiz/Start/Start';
import { TodoContext } from '@/contexts/TodoContext';
import { AttendantStatus } from '@/generated/Enum';
import Todo from '@/components/Quiz/TodoQuiz/CandidateQuiz/CandidateQuiz';

const TodoQuiz = () => {
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

export default TodoQuiz;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const notFoundRedirect = {
    notFound: true,
  };

  if (query.test && query.attendant) {
    console.log(query);
    return {
      props: {},
    };
  }
  return notFoundRedirect;
};

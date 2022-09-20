import React from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import StartQuiz from '@/components/Quiz/TodoQuiz/Start/Start';
import { TodoContext } from '@/contexts/TodoContext';
import { AttendantStatus } from '@/generated/Enum';
import Todo from '@/components/Quiz/TodoQuiz/CandidateQuiz/CandidateQuiz';
import apollo from '@/utils/ApolloClient';
import {
  VerifyTestUriDocument,
  VerifyTestUriMutationVariables,
  VerifyTestUriMutation,
  VerifyTestUriResponse,
} from '@/generated/graphql';

const TodoQuiz: NextPage<VerifyTestUriResponse> = ({
  numberOfQuestions,
  attendant,
  test,
}) => {
  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <TodoContext.Provider
        value={{
          status: String(attendant.status),
          attendant,
          test,
          numberOfQuestions,
        }}
      >
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
  try {
    if (query.test && query.attendant) {
      const { test, attendant } = query as any;
      const find = await apollo(context).mutate<
        VerifyTestUriMutation,
        VerifyTestUriMutationVariables
      >({
        mutation: VerifyTestUriDocument,
        variables: { test, attendant },
      });

      if (
        find.data &&
        find.data.verifyTestUri &&
        find.data.verifyTestUri.verified
      ) {
        return {
          props: {
            ...find.data.verifyTestUri,
          },
        };
      }
    }
    return notFoundRedirect;
  } catch (error) {
    return notFoundRedirect;
  }
};

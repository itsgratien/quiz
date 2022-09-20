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
  useWhoIsDoingQuizLazyQuery,
  useChangeStatusMutation,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

const TodoQuiz: NextPage<VerifyTestUriResponse> = ({
  numberOfQuestions,
  attendant,
  test,
}) => {
  const [status, setStatus] = React.useState<string>(String(attendant.status));

  const [loading, setLoading] = React.useState<boolean>(true);

  const router = useRouter();

  const [whoIsDoingQuizFunc, { data, loading: whoIsLoading, refetch }] =
    useWhoIsDoingQuizLazyQuery();

  const [
    changeStatusFunc,
    { data: changeStatusResponse, loading: changeStatusLoading },
  ] = useChangeStatusMutation();

  const handleChangeStatus = async (value: string) => {
    const { test, attendant } = router.query;
    await changeStatusFunc({
      variables: {
        status: value,
        test: String(test),
        attendant: String(attendant),
      },
    });
  };

  React.useEffect(() => {
    if (router.query && router.query.test && router.query.attendant) {
      whoIsDoingQuizFunc({
        variables: {
          test: String(router.query.test),
          attendant: String(router.query.attendant),
        },
      });
    }
  }, [whoIsDoingQuizFunc, router]);

  React.useEffect(() => {
    if (data && data.whoIsDoingQuiz) {
      setLoading(false);
      if (data.whoIsDoingQuiz.attendant) {
        setStatus(String(data.whoIsDoingQuiz.attendant.status));
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (changeStatusResponse && changeStatusResponse.changeStatus) {
      if (changeStatusResponse.changeStatus.attendant) {
        setStatus(String(changeStatusResponse.changeStatus.attendant.status));
      }
    }
  }, [changeStatusResponse]);

  React.useEffect(()=> {
    if(changeStatusLoading || whoIsLoading){
      setLoading(changeStatusLoading || whoIsLoading)
    }
  }, [changeStatusLoading, whoIsLoading])

  return (
    <>
      <Head>
        <title>{`Quiz | ${test.title || ''}`}</title>
      </Head>
      <TodoContext.Provider
        value={{
          status,
          attendant,
          test,
          numberOfQuestions,
          loading,
          changeStatus: handleChangeStatus,
        }}
      >
        <TodoContext.Consumer>
          {({ status, loading }) => {
            if (loading) {
              return (
                <div className="h-screen w-full flex items-center justify-center bg-primary">
                  <LoadingSpinner />
                </div>
              );
            } else {
              switch (status) {
                case AttendantStatus.InProgress:
                  return <Todo />;
                default:
                  return <StartQuiz />;
              }
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

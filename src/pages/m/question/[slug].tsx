import React from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import Layout from '@/components/Layout';
import classname from 'classnames';
import style from 'src/styles/Quiz.module.scss';
import { withAuth } from '@/utils/WithAuth';
import Head from 'next/head';
import Heading from '@/components/Quiz/QuestionDetail/Heading';
import DetailChoice from '@/components/Quiz/QuestionDetail/DetailChoice';
import Description from '@/components/Quiz/QuestionDetail/Description';
import { useGetQuestionQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';

const QuestionDetailPage: NextPage = () => {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { data } = useGetQuestionQuery({ variables: { id: slug } });

  const q = data?.getQuestion.data ?? undefined;

  return (
    <>
      <Head>
        <title>Question</title>
      </Head>
      <Layout goBack>
        <div className={classname(style.quizDetail)}>
          <Heading
            width="100%"
            status={q?.status ?? undefined}
            createdAt={q?.createdAt ?? undefined}
            type={q?.type ?? undefined}
          />
        </div>
        <div
          className={classname('m-auto')}
          style={{ width: '1100px', marginTop: '42px' }}
        >
          <DetailChoice titleMarginLeft="18%" choices={q?.choices ?? []} />
        </div>
        <div
          className={classname(style.quizDetail, 'm-auto')}
          style={{ margin: '40px auto', marginBottom: '200px' }}
        >
          <Description value={q?.description ?? undefined} />
        </div>
      </Layout>
    </>
  );
};
export default QuestionDetailPage;

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  withAuth(ctx, () => {
    return {
      props: {},
    };
  });

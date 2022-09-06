import React from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import style from 'src/styles/Quiz.module.scss';
import QuizItem from '@/components/Quiz/QuizItem/QuizItem';
import { withAuth } from '@/utils/WithAuth';
import { QuizPageProps } from '@/generated/Quiz';
import { Icon } from '@iconify/react';
import classname from 'classnames';
import { useGetMyTestsLazyQuery, Test } from '@/generated/graphql';
import NotFound from '@/components/Quiz/Setup/View/NotFound';

const Quiz: NextPage<QuizPageProps> = ({ me }) => {
  const [page, setPage] = React.useState<number>(1);

  const [items, setItems] = React.useState<Test[]>([]);

  const [getMyTest, { data, loading }] = useGetMyTestsLazyQuery({
    variables: { page, limit: 14 },
  });

  React.useEffect(() => {
    getMyTest();
  }, [getMyTest]);

  React.useEffect(() => {
    if (data && data.getMyTests && data.getMyTests.items) {
      setItems(data.getMyTests.items as Test[]);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Quizzes</title>
      </Head>
      <Layout>
        <div className={style.quiz}>
          {me && (
            <div className={classname('relative', style.greeting)}>
              <span className="font-bold">Hello,</span>
              <span className="flex items-center">
                <Icon icon="bx:user" fontSize={24} />
                <span
                  className="font-bold ml-1 mt-1"
                  style={{ fontSize: '14px' }}
                >
                  {me.email.split('@')[0]}
                </span>
              </span>
            </div>
          )}
          {!loading && (
            <>
              {' '}
              {items && items.length > 0 && (
                <div
                  className={classname(
                    'relative flex items-center flex-wrap',
                    style.items
                  )}
                >
                  {items && (
                    <>
                      {items.length > 0 &&
                        items.map((item) => (
                          <div className={style.item} key={item._id}>
                            <QuizItem item={item} />
                          </div>
                        ))}
                    </>
                  )}
                </div>
              )}
              {items && items.length <= 0 && <NotFound />}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Quiz;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  withAuth(ctx, (user) => {
    return {
      props: {
        me: user,
      },
    };
  });

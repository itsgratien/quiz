import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import style from 'src/styles/Quiz.module.scss';
import QuizItem from '@/components/Quiz/QuizItem/QuizItem';
import { QuizPageProps } from '@/generated/Quiz';
import { Icon } from '@iconify/react';
import classname from 'classnames';
import { useGetMyTestsLazyQuery, Test, User } from '@/generated/graphql';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { isAuth } from '@/utils/IsAuth';

const Quiz: NextPage<QuizPageProps> = ({ me }) => {
  const [page, setPage] = React.useState<number>(1);

  const [items, setItems] = React.useState<Test[]>([]);

  const [getMyTest, { data, loading }] = useGetMyTestsLazyQuery();

  const router = useRouter();

  React.useEffect(() => {
    getMyTest({ variables: { page, limit: 14 } });
  }, [getMyTest, page]);

  React.useEffect(() => {
    if (data && data.getMyTests && data.getMyTests.items) {
      setItems(data.getMyTests.items as Test[]);
    }
    if (data && data.getMyTests && data.getMyTests.error) {
      toast.error(data.getMyTests.error);
    }
  }, [data]);

  const handleView = (slug: string) => {
    router.push(`/m/quiz/${slug}`);
  };

  return (
    <>
      <Head>
        <title>Quizzes</title>
      </Head>
      <Layout showSetupButton>
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
          {!loading && items && (
            <>
              {' '}
              {items && items.length > 0 && (
                <div
                  className={classname(
                    'relative flex items-center flex-wrap',
                    style.items,
                  )}
                >
                  {items.length > 0 &&
                    items.map((item) => (
                      <div className={style.item} key={item._id}>
                        <QuizItem item={item} handleView={handleView} />
                      </div>
                    ))}
                </div>
              )}
              {items && items.length <= 0 && <NotFound />}
            </>
          )}
          {loading && <LoadingSpinner />}
        </div>
      </Layout>
    </>
  );
};

export default Quiz;

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<{ props: { me?: User } }> => {
  try {
    const user = await isAuth(ctx.req.headers as any);

    return {
      props: {
        me: user,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

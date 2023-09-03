'use client';
import React from 'react';
import { useGetMyTestsLazyQuery, Test, User } from '@/generated/graphql';
import cn from 'classnames';
import styles from './Quiz.module.scss';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import QuizItem from './QuizItem/QuizItem';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

interface AssessmentsProps {
  me?: User;
}
const Assessments = ({ me }: AssessmentsProps) => {
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

  if (!me) {
    return <></>;
  }

  return (
    <div className={styles.quiz}>
      {me && (
        <div className={cn('relative', styles.greeting)}>
          <span className="font-bold">Hello,</span>
          <span className="flex items-center">
            <Icon icon="bx:user" fontSize={24} />
            <span className="font-bold ml-1 mt-1" style={{ fontSize: '14px' }}>
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
              className={cn(
                'relative flex items-center flex-wrap',
                styles.items,
              )}
            >
              {items.length > 0 &&
                items.map((item) => (
                  <div className={styles.item} key={item._id}>
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
  );
};

export default Assessments;

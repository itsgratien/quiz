import React from 'react';
import Grid from '@mui/material/Grid';
import classname from 'classnames';
import style from './QuizDetail.module.scss';
import SectionTitle from '@/components/Quiz/SectionTitle';
import QuestionItem from '@/components/Quiz/QuestionItem/QuestionItem';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import LoadMoreButton from '@/components/Quiz/LoadMoreButton';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import { useRouter } from 'next/router';
import useGetQuestionAssignedToTest from '@/hooks/useGetQuestionAssignedToTest';

const QuestionAsked = ({ testId }: { testId: string }) => {
  const router = useRouter();

  const { loading, items, handleLoadMore, totalDoc } =
    useGetQuestionAssignedToTest({ testId, limit: 15 });

  return (
    <div className={classname('relative', style.section)}>
      <div className={classname(style.sectionTitle)}>
        <SectionTitle
          title="Question Asked"
          total={items ? `${items.length} total results` : undefined}
        />
      </div>
      {items && (
        <>
          {items.length > 0 && (
            <>
              <div className={classname(style.questionItems)}>
                <Grid container spacing={8}>
                  {items.map((item) => (
                    <Grid item xs={4} key={item._id}>
                      <QuestionItem
                        title={item.title}
                        points={item.points}
                        type={item.type as string}
                        handleView={() =>
                          router.push(`/m/question/${item.slug}`)
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
              {totalDoc && totalDoc > items.length && (
                <LoadMoreButton
                  marginTop="49px"
                  className={style.sectionTitle}
                  handleClick={handleLoadMore}
                  loading={loading}
                />
              )}
            </>
          )}
          {items.length <= 0 && (
            <div className={style.notFound}>
              <NotFound message=" " alignItem="start" />
            </div>
          )}
        </>
      )}
      {loading && !items && (
        <div className={style.sectionTitle}>
          <LoadingSpinner size={30} justify="start" />
        </div>
      )}
    </div>
  );
};
export default QuestionAsked;

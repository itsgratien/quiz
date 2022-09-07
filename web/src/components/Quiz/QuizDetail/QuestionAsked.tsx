import React from 'react';
import Grid from '@mui/material/Grid';
import classname from 'classnames';
import style from './QuizDetail.module.scss';
import {
  useGetQuestionAssignedToTestLazyQuery,
  Question,
} from '@/generated/graphql';
import SectionTitle from '@/components/Quiz/SectionTitle';
import QuestionItem from '@/components/Quiz/QuestionItem/QuestionItem';
import NotFound from '@/components/Quiz/Setup/View/NotFound';
import LoadMoreButton from '@/components/Quiz/LoadMoreButton';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

const QuestionAsked = ({ testId }: { testId: string }) => {
  const [page, setPage] = React.useState<number>(1);

  const [items, setItems] = React.useState<Question[]>();

  const [totalDocs, setTotalDocs] = React.useState<number>();

  const [getQuestions, { data, loading }] =
    useGetQuestionAssignedToTestLazyQuery();

  const handleLoadMore = () => {
    setPage((item) => item + 1);
  };

  React.useEffect(() => {
    if (testId) {
      getQuestions({ variables: { testId, page, limit: 15 } });
    }
  }, [testId, page, getQuestions]);

  React.useEffect(() => {
    if (
      data &&
      data.getQuestionAssignedToTest &&
      data.getQuestionAssignedToTest.items
    ) {
      setItems((item) => {
        if (item) {
          if (data.getQuestionAssignedToTest.nextPage === page) {
            return item;
          }
          return [...item, ...data.getQuestionAssignedToTest.items];
        }
        return data.getQuestionAssignedToTest.items;
      });

      setTotalDocs(data.getQuestionAssignedToTest.totalDocs || undefined);
    }
  }, [data, page]);

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
                        handleView={() => ''}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
              {totalDocs && totalDocs > items.length && (
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

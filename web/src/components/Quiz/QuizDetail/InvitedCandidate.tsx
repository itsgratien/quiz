import React from 'react';
import classname from 'classnames';
import style from './QuizDetail.module.scss';
import SectionTitle from '../SectionTitle';
import NotFound from '../Setup/View/NotFound';
import Grid from '@mui/material/Grid';
import CandidateItem from '../Candidates/CandidateItem';
import CandidateHeaderItem from '../Candidates/CandidateHeaderItem';
import { Attendant, useGetAttendantByTestLazyQuery } from '@/generated/graphql';
import { AttendantStatus } from '@/generated/Enum';
import LoadMoreButton from '../LoadMoreButton';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import { useRouter } from 'next/router';

const InvitedCandidate = ({ testId }: { testId: string }) => {
  const [page, setPage] = React.useState<number>(1);

  const [totalDocs, setTotalDocs] = React.useState<number>();

  const [items, setItems] = React.useState<Attendant[]>();

  const [statistic, setStatistic] = React.useState<{ [key: string]: number }>();

  const [getAttendant, { data, loading }] = useGetAttendantByTestLazyQuery();

  const router = useRouter();

  const handleLoadMore = () => {
    setPage((item) => item + 1);
  };

  React.useEffect(() => {
    if (testId) {
      getAttendant({ variables: { testId, page, limit: 15 } });
    }
  }, [testId, getAttendant, page]);

  React.useEffect(() => {
    if (data && data.getAttendantByTest && data.getAttendantByTest.items) {
      setItems((item) => {
        if (item) {
          if (data.getAttendantByTest.nextPage === page) {
            return item;
          }
          return [...item, ...data.getAttendantByTest.items];
        } else {
          return data.getAttendantByTest.items;
        }
      });
      setTotalDocs(data.getAttendantByTest.totalDocs || undefined);

      const { startedDoc, inProgressDoc, completedDoc } =
        data.getAttendantByTest;

      setStatistic({
        started: startedDoc || 0,
        inProgress: inProgressDoc || 0,
        completed: completedDoc || 0,
      });
    }
  }, [data, page]);

  return (
    <div className={classname('relative', style.section)}>
      <div className={classname(style.sectionTitle)}>
        <SectionTitle
          title="Invited Candidates"
          total={totalDocs ? `${totalDocs} total results` : undefined}
        />
        <div className="flex items-center mt-5">
          <CandidateHeaderItem
            number={statistic ? statistic.started : 0}
            status={AttendantStatus.Started}
          />
          <CandidateHeaderItem
            number={statistic ? statistic.inProgress : 0}
            status={AttendantStatus.InProgress}
          />
          <CandidateHeaderItem
            number={statistic ? statistic.completed : 0}
            status={AttendantStatus.Completed}
          />
        </div>
      </div>

      {items && (
        <>
          {items.length > 0 ? (
            <>
              {' '}
              <div className={classname(style.questionItems)}>
                <Grid container spacing={8}>
                  {items.map((item) => (
                    <Grid item xs={4} key={item._id}>
                      <CandidateItem
                        {...item}
                        status={String(item.status)}
                        handleViewAnswer={() =>
                          router.push(`/m/candidate/${item._id}`)
                        }
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
          ) : (
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

export default InvitedCandidate;

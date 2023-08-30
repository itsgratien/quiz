import React from 'react';
import classname from 'classnames';
import style from './QuizDetail.module.scss';
import SectionTitle from '../SectionTitle';
import NotFound from '../Setup/View/NotFound';
import Grid from '@mui/material/Grid';
import CandidateItem from '../Candidates/CandidateItem';
import CandidateHeaderItem from '../Candidates/CandidateHeaderItem';
import { AttendantStatus } from '@/generated/Enum';
import LoadMoreButton from '../LoadMoreButton';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import { useRouter } from 'next/router';
import useGetCandidateAssignedToTest from '@/hooks/useGetCandidateAssignedToTest';

const InvitedCandidate = ({ testId }: { testId: string }) => {
  const router = useRouter();

  const { handleLoadMore, loading, items, statistic, totalDoc } =
    useGetCandidateAssignedToTest({ testId, limit: 15 });

  return (
    <div className={classname('relative', style.section)}>
      <div className={classname(style.sectionTitle)}>
        <SectionTitle
          title="Invited Candidates"
          total={totalDoc ? `${totalDoc} total results` : undefined}
        />
        {statistic && (
          <div className="flex items-center mt-5">
            <CandidateHeaderItem
              number={statistic.started ?? undefined}
              status={AttendantStatus.Started}
            />
            <CandidateHeaderItem
              number={statistic.inProgress ?? undefined}
              status={AttendantStatus.InProgress}
            />
            <CandidateHeaderItem
              number={statistic.completed ?? undefined}
              status={AttendantStatus.Completed}
            />
          </div>
        )}
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
              {totalDoc && totalDoc > items.length && (
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
        <div className={classname(style.sectionTitle, 'mt-5')}>
          <LoadingSpinner size={30} justify="start" />
        </div>
      )}
    </div>
  );
};

export default InvitedCandidate;

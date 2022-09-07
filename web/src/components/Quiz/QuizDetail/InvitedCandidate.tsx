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

const InvitedCandidate = ({ testId }: { testId: string }) => {
  const [page, setPage] = React.useState<number>(1);

  const [items, setItems] = React.useState<Attendant[]>();

  const [getAttendant, { data, loading }] = useGetAttendantByTestLazyQuery();

  const handleLoadMore = () => {
    // setPage((item) => item + 1);
  };

  React.useEffect(() => {
    if (testId) {
      getAttendant({ variables: { testId, page, limit: 15 } });
    }
  }, [testId, getAttendant, page]);

  React.useEffect(() => {
    if (data && data.getAttendantByTest && data.getAttendantByTest.items) {
      setItems((item) =>
        item
          ? [...item, data.getAttendantByTest.items]
          : (data.getAttendantByTest.items as any)
      );
    }
  }, [data]);

  return (
    <div className={classname('relative', style.section)}>
      <div className={classname(style.sectionTitle)}>
        <SectionTitle title="Invited Candidates" total="50 total results" />
        <div className="flex items-center mt-5">
          <CandidateHeaderItem number={5} status={AttendantStatus.Started} />
          <CandidateHeaderItem
            number={20}
            status={AttendantStatus.InProgress}
          />
          <CandidateHeaderItem number={30} status={AttendantStatus.Completed} />
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
                        handleViewAnswer={() => ''}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
              <LoadMoreButton
                marginTop="49px"
                className={style.sectionTitle}
                handleClick={handleLoadMore}
              />
            </>
          ) : (
            <div className={style.notFound}>
              <NotFound message=" " alignItem="start" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default InvitedCandidate;

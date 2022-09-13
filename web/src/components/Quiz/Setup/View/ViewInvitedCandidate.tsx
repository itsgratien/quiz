import React from 'react';
import classname from 'classnames';
import style from './View.module.scss';
import NotFound from './NotFound';
import AddNewButton from './AddNewButton';
import Modal from '../ModalContainer';
import Button from '../Button';
import SectionTitle from '@/components/Quiz/SectionTitle';
import CandidateItem from '../../Candidates/CandidateItem';
import Grid from '@mui/material/Grid';
import Warning from '@/components/Shared/Alert/WarningAlertModal';
import NewCandidate from '../NewCandidate';
import ImportCandidate from '../Import/ImportCandidate';
import LeftTitle from '../LeftTitle';
import { SetupProps } from '@/generated/Shared';
import useGetCandidateAssignedToTest from '@/hooks/useGetCandidateAssignedToTest';
import useSetup from '@/hooks/useSetup';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import LoadMoreButton from '../../LoadMoreButton';
import { toast } from 'react-hot-toast';
import { usePublishTestMutation } from '@/generated/graphql';

export const ViewInvitedCandidate = ({ open, handleClose }: SetupProps) => {
  const [openC, setOpenC] = React.useState<boolean>(false);

  const [warning, setWarning] = React.useState<boolean>(false);

  const [setupCandidate, setSetupCandidate] = React.useState<boolean>(false);

  const [importCandidate, setImportCandidate] = React.useState<boolean>(false);

  const [loadFull, setLoadFull] = React.useState<boolean>(true);

  const setup = useSetup();

  const { test } = setup;

  const { items, loading, totalDoc, handleLoadMore, handleReload } =
    useGetCandidateAssignedToTest({
      testId: test?._id,
      limit: 15,
    });

  const [publishTest, publishResponse] = usePublishTestMutation();

  const handleFetchMore = async () => {
    setLoadFull(false);
    await handleLoadMore();
  };

  const handleCloseModal = async (reload?: boolean) => {
    setSetupCandidate(false);
    setImportCandidate(false);
    if (typeof reload === 'boolean' && reload) {
      setLoadFull(true);
      await handleReload();
    }
  };

  const handlePublish = React.useCallback(async () => {
    if (test) {
      if (items && items.length > 0) {
        await publishTest({ variables: { testId: test._id } });
      } else {
        toast.error('Provide candidates');
      }
    }
  }, [test, publishTest, items]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        <Button
          name="Publish"
          className="primary"
          handleClick={handlePublish}
        />
      }
      leftElement={<LeftTitle title={test ? `${test.title}` : ''} />}
    >
      {warning && (
        <Warning
          open={warning}
          handleClose={() => setWarning(false)}
          enable={{
            name: 'By importing them',
            onClick: () => {
              setImportCandidate(true);
              setWarning(false);
            },
          }}
          disable={{
            name: 'Using default',
            onClick: () => {
              setSetupCandidate(true);
              setWarning(false);
            },
          }}
          message="How would you like to invite candidates to the quiz ?"
        />
      )}
      {setupCandidate && (
        <NewCandidate open={setupCandidate} handleClose={handleCloseModal} />
      )}
      {importCandidate && (
        <ImportCandidate
          open={importCandidate}
          handleClose={handleCloseModal}
        />
      )}
      <div
        className={classname(
          style.setup,
          style.viewInvitedCandidate,
          style.viewAssignedQuestion
        )}
      >
        {loadFull && loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <SectionTitle
              title="Invite Candidates To Do The Quiz"
              titleColor="fewBlack"
              total={test ? `(${test.title})` : ''}
              textSize={14}
              totalMarginLeft="0"
              totalColor="fewBlack"
            />
            {items && (
              <>
                {items.length > 0 ? (
                  <div className={classname(style.candidateItems, 'mt-10')}>
                    <Grid container spacing={4}>
                      {items.map((item) => (
                        <Grid item xs={4} key={item._id}>
                          <CandidateItem
                            {...item}
                            status={item.status ?? undefined}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <AddNewButton
                      position="fixed"
                      onClick={() => setWarning(true)}
                    />
                  </div>
                ) : (
                  <div className={classname(style.notFoundSec)}>
                    <NotFound message="There are No Candidates Invited click on the button below to add new" />
                    <div style={{ marginTop: '38px' }}>
                      <AddNewButton onClick={() => setWarning(true)} />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        {items && totalDoc && totalDoc > items.length ? (
          <div className="mt-10">
            <LoadMoreButton
              handleClick={handleFetchMore}
              align="center"
              loading={loading}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};
export default ViewInvitedCandidate;

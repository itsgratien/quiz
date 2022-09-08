import React from 'react';
import classname from 'classnames';
import style from './View.module.scss';
import NotFound from './NotFound';
import AddNewButton from './AddNewButton';
import Modal from '../ModalContainer';
import Button from '../Button';
import SectionTitle from '@/components/Quiz/SectionTitle';
import AttendantMock from '@/mocks/Candidate';
import CandidateItem from '../../Candidates/CandidateItem';
import Grid from '@mui/material/Grid';
import Warning from '@/components/Shared/Alert/WarningAlertModal';
import NewCandidate from '../NewCandidate';
import ImportCandidate from '../Import/ImportCandidate';
import LeftTitle from '../LeftTitle';
import { SetupProps } from '@/generated/Shared';

export const ViewInvitedCandidate = ({ open, handleClose }: SetupProps) => {
  const [openC, setOpenC] = React.useState<boolean>(false);

  const [warning, setWarning] = React.useState<boolean>(false);

  const [setupCandidate, setSetupCandidate] = React.useState<boolean>(false);

  const [importCandidate, setImportCandidate] = React.useState<boolean>(false);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={<Button name="Next" className="next" />}
      leftElement={<LeftTitle title="Javascript Quiz" />}
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
        <NewCandidate
          open={setupCandidate}
          handleClose={() => setSetupCandidate(false)}
        />
      )}
      {importCandidate && (
        <ImportCandidate
          open={importCandidate}
          handleClose={() => setImportCandidate(false)}
        />
      )}
      <div
        className={classname(
          style.setup,
          style.viewInvitedCandidate,
          style.viewAssignedQuestion
        )}
      >
        <SectionTitle
          title="Invite Candidates To Do The Quiz"
          titleColor="fewBlack"
          total="(Javascript programming quiz)"
          textSize={14}
          totalMarginLeft="0"
          totalColor="fewBlack"
        />
        {AttendantMock.getAll.length > 0 ? (
          <div className={classname(style.candidateItems, 'mt-10')}>
            <Grid container spacing={4}>
              {AttendantMock.getAll.map((item) => (
                <Grid item xs={4} key={item._id}>
                  <CandidateItem {...item} handleEdit={() => ''} />
                </Grid>
              ))}
            </Grid>
            <AddNewButton position="fixed" onClick={() => setWarning(true)} />
          </div>
        ) : (
          <div className={classname(style.notFoundSec)}>
            <NotFound message="There are No Candidates Invited click on the button below to add new" />
            <div style={{ marginTop: '38px' }}>
              <AddNewButton onClick={() => setOpenC(true)} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default ViewInvitedCandidate;

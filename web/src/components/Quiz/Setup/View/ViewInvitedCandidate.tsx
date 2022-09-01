import React from 'react';
import classname from 'classnames';
import style from './View.module.scss';
import NotFound from './NotFound';
import AddNewButton from './AddNewButton';
import Modal from '../ModalContainer';
import Button from '../Button';
import SectionTitle from '@/components/Quiz/SectionTitle';

export const ViewInvitedCandidate = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose?: () => void;
}) => {
  const [openC, setOpenC] = React.useState<boolean>(false);
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={<Button name="Next" className="next" />}
      leftElement={
        <div>
          <span className="font-bold text-14 text-black">Javascript Quiz</span>
        </div>
      }
    >
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
        <div className={classname(style.notFoundSec)}>
          <NotFound message="There are No Candidates Invited click on the button below to add new" />
          <div style={{ marginTop: '38px' }}>
            <AddNewButton onClick={() => setOpenC(true)} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ViewInvitedCandidate;

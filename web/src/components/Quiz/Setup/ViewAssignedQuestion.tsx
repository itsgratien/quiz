import React from 'react';
import classname from 'classnames';
import style from './Setup.module.scss';
import Modal from './ModalContainer';
import Button from './Button';
import SectionTitle from '../SectionTitle';

export const ViewAssignedQuestion = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose?: () => void;
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        <Button name="Next" className="next" handleClick={() => ''} />
      }
      leftElement={
        <div>
          <span className="font-bold text-14 text-black">Javascript Quiz</span>
        </div>
      }
    >
      <div className={classname(style.setup, style.viewAssignedQuestion)}>
        <SectionTitle
          title="Add Questions To The Quiz"
          titleColor="fewBlack"
          total="(Javascript programming quiz)"
          textSize={14}
          totalMarginLeft="0"
          totalColor="fewBlack"
        />
      </div>
    </Modal>
  );
};
export default ViewAssignedQuestion;

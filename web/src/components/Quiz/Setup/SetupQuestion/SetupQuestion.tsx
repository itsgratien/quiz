import React from 'react';
import classname from 'classnames';
import style from './SetupQuestion.module.scss';
import Modal from '../ModalContainer';
import Button from '../Button';
import SectionTitle from '../../SectionTitle';

export const SetupQuestion = ({
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
        <Button
          name="Save & Close"
          className="primary"
          handleClick={() => {}}
        />
      }
      leftElement={
        <div>
          <span className="font-bold text-14 tex-black">Setup Question</span>
        </div>
      }
    >
      <div className={classname('relative', style.setup, style.setupQuestion)}>
      <div className={classname(style.qTitle)}>
           <input type="text" placeholder="Title of your question" className={classname('rounded-10')}/>
        </div>
        <div>
          <div>
            <SectionTitle/>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default SetupQuestion;

import React from 'react';
import style from './Import.module.scss';
import classname from 'classnames';
import Modal from '../ModalContainer';
import Button from '../Button';
import LeftTitle from '../LeftTitle';

const ImportCandidate = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        <Button
          type="submit"
          name="Accept & Close"
          className="accept"
          handleClick={() => ''}
        />
      }
      leftElement={<LeftTitle title="Import New Candidate" />}
    >
      <div className={classname(style.setup)}>
        <h1>Hello world</h1>
      </div>
    </Modal>
  );
};
export default ImportCandidate;

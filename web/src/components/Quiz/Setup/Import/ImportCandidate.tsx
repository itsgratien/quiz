import React from 'react';
import style from './Import.module.scss';
import classname from 'classnames';
import Modal from '../ModalContainer';
import Button from '../Button';
import LeftTitle from '../LeftTitle';
import NB from './NB';

const ImportCandidate = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [showNextButton, setShowNextButton] = React.useState<boolean>(false);
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        showNextButton ? (
          <Button
            type="submit"
            name="Accept & Close"
            className="accept"
            handleClick={() => ''}
          />
        ) : undefined
      }
      leftElement={<LeftTitle title="Import New Candidate" />}
    >
      <div className={classname(style.setup)}>
        <NB />
      </div>
    </Modal>
  );
};
export default ImportCandidate;

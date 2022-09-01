import * as React from 'react';
import classname from 'classnames';
import style from './Setup.module.scss';
import Modal from '@mui/material/Modal';
import Button from './Button';
import { Icon } from '@iconify/react';

const ModalContainer = ({
  open,
  children,
  handleClose,
  nextButton,
  leftElement,
}: {
  children: React.ReactNode;
  open: boolean;
  handleClose?: () => void;
  nextButton?: JSX.Element;
  leftElement?: JSX.Element;
}) => {
  return (
    <Modal open={open}>
      <div
        className={classname(
          'relative outline-none focus:outline bg-white w-full h-screen'
        )}
        style={{ overflowY: 'auto' }}
      >
        <div
          className={classname(
            'fixed right-0 left-0 bg-white top-0 z-10',
            style.modalHeader
          )}
        >
          <div className={classname('flex justify-between')}>
            <div className={classname('flex')}>
              <Icon fontSize={24} icon="simple-icons:namebase" />
              <div className="ml-3">{leftElement}</div>
            </div>
            <div className={classname('flex items-center', style.headerButton)}>
              <Button
                type="button"
                name="Close"
                className="close"
                icon={{ color: '#FF0000', name: 'ep:circle-close-filled' }}
                handleClick={handleClose}
              />
              {nextButton || <div></div>}
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </Modal>
  );
};

export default ModalContainer;

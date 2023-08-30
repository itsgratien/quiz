import React from 'react';
import classname from 'classnames';
import style from './Alert.module.scss';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import LoadingSpinner from '../LoadingSpinner';

interface Enable {
  name: string;
  onClick?: () => void;
  loading?: boolean;
}

const WarningAlertModal = ({
  open,
  handleClose,
  message,
  enable,
  disable,
}: {
  open: boolean;
  handleClose: () => void;
  message?: string;
  enable?: Enable;
  disable?: Enable;
}) => {
  return (
    <Modal open={open}>
      <div
        className={classname(
          'relative outline-none focus:outline-none flex items-center justify-center',
          style.warningModal
        )}
      >
        <div
          className={classname('bg-white rounded-10 relative', style.warning)}
        >
          <div className={classname('font-bold text-14 text-black')}>
            {message || 'Are you sure you want to perform this action ?'}
          </div>
          <div
            className={classname('flex items-center')}
            style={{ marginTop: '44px' }}
          >
            {enable && (
              <button
                type="button"
                className={classname(
                  'outline-none focus:outline-none text-14 bg-primary font-bold',
                  style.btn
                )}
                onClick={enable.onClick}
                disabled={enable.loading}
              >
                {enable.loading ? (
                  <LoadingSpinner size={30} />
                ) : (
                  <>{enable.name}</>
                )}
              </button>
            )}
            <div style={{ margin: '0 30px' }} className="font-bold">
              or
            </div>
            {disable && (
              <button
                type="button"
                className={classname(
                  'outline-none focus:outline-none text-14 bg-f1 font-bold',
                  style.btn
                )}
                onClick={disable.onClick}
              >
                {disable.name}
              </button>
            )}
          </div>
          <div
            className={classname('absolute bottom-0 right-0', style.closeBtn)}
          >
            <button
              type="button"
              className={classname(
                'outline-none focus:outline-none flex items-center justify-center'
              )}
              onClick={handleClose}
            >
              <Icon icon="bytesize:close" fontSize={30} color="white" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default WarningAlertModal;

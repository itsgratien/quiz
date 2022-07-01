import React from 'react';
import Modal from '@mui/material/Modal';
import { CustomModalPropsT } from '@/generated/Shared';

export const CustomModal = ({ open, onClose, children }: CustomModalPropsT) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="outline-none focus:outline-none flex items-center justify-center h-full">{children}</div>
    </Modal>
  );
};
export default CustomModal;

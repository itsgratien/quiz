import React from 'react';
import classname from 'classnames';
import style from './SetupButton.module.scss';
import { Icon } from '@iconify/react';

export interface SetupButtonProps {
  handleClick: () => void;
  icon?: string;
  isEdit?: boolean;
}

const SetupButton = ({ handleClick, icon, isEdit }: SetupButtonProps) => {
  return (
    <button
      type="button"
      className={classname(
        'relative outline-none focus:outline-none rounded-full flex items-center justify-center',
        isEdit ? `${style.edit} bg-f1` : 'bg-primary'
      )}
      onClick={handleClick}
    >
      <Icon icon={icon || 'akar-icons:plus'} fontSize={35} />
    </button>
  );
};
export default SetupButton;

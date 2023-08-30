import React from 'react';
import classname from 'classnames';
import style from './QuestionItem.module.scss';
import { Icon } from '@iconify/react';

const EditButton = ({
  name,
  handleClick,
  type,
  iconName,
}: {
  name?: string;
  handleClick?: () => void;
  type?: 'primary' | 'secondary' | 'danger';
  iconName?: string;
}) => {
  return (
    <button
      type="button"
      className={classname(
        'outline-none focus:outline-none flex items-center justify-center  text-12 text-black font-bold',
        style.editBtn,
        type === 'primary'
          ? style.editBtnPrimary
          : type === 'danger'
          ? `${style.dangerBtn} text-white`
          : style.editBtnSecondary
      )}
      onClick={handleClick}
    >
      <span className="capitalize">{name || 'Edit'}</span>
      <Icon
        icon={iconName || 'dashicons:edit-large'}
        fontSize={15}
        className="ml-2"
      />
    </button>
  );
};
export default EditButton;

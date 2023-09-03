'use client';
import * as React from 'react';
import classname from 'classnames';
import style from './Shared.module.scss';
import { Icon } from '@iconify/react';

const GoBack = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button
      type="button"
      className={classname(
        'outline-none focus:outline-none flex items-center bg-f1 rounded-10',
        style.goBack,
      )}
      onClick={handleClick}
    >
      <Icon icon="eva:arrow-ios-back-outline" fontSize={40} />
      <span className="font-bold text-black text-14">back</span>
    </button>
  );
};
export default GoBack;

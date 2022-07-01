import React from 'react';
import { Icon } from '@iconify/react';
import classname from 'classnames';
import style from './Style.module.scss';
import { SetupHeaderPropsT } from '@/generated/Quiz';

export const SetupHeader = ({ title, onClose }: SetupHeaderPropsT) => {
  return (
    <div
      className={classname(
        'flex items-center justify-between relative',
        style.setupHeader
      )}
      style={{ paddingLeft: '150px' }}
    >
      <span className="font-bold capitalize">{title}</span>
      <button
        type="button"
        className={classname(
          'outline-none focus:outline-none flex items-center justify-center',
          style.closeBtn
        )}
        onClick={onClose}
      >
        <Icon icon="bytesize:close" color="white" />
      </button>
    </div>
  );
};

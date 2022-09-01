import React from 'react';
import classname from 'classnames';
import style from './SetupQuestion.module.scss';
import { Icon } from '@iconify/react';

export const CheckBox = ({
  label,
  onClick,
  value,
}: {
  label: string;
  onClick: (value: string) => void;
  value?: string;
}) => {
  return (
    <div className={classname('relative', style.checkBox)}>
      <input
        type="checkbox"
        className={classname('outline-none focus:outline-none')}
        onClick={() => onClick(label)}
      />
      <div
        className={classname(
          'absolute left-0 right-0 top-0 bottom-0 bg-f1 flex items-center justify-center',
          style.absoluteCheck
        )}
      >
        {label === value && (
          <Icon icon="bi:check" fontSize={28} color="rgba(0, 0, 0, 0.54)" />
        )}
      </div>
    </div>
  );
};
export default CheckBox;

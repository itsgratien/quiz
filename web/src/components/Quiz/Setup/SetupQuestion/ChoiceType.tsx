import React from 'react';
import style from './SetupQuestion.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';

export const ChoiceType = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div
      className={classname(
        'relative flex items-center rounded-5',
        style.choiceType
      )}
    >
      <div className={classname('relative', style.checkBox)}>
        <input
          type="checkbox"
          className={classname('outline-none focus:outline-none')}
          onClick={() => onChange(label)}
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
      <span
        className={classname('font-bold text-14 capitalize text-black')}
        style={{ marginLeft: '13px' }}
      >
        {label}
      </span>
    </div>
  );
};
export default ChoiceType;

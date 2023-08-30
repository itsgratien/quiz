import React from 'react';
import style from './SetupQuestion.module.scss';
import classname from 'classnames';
import { CheckBox } from './CheckBox';

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
      <CheckBox
        value={value}
        label={label}
        onClick={(value) => onChange(value)}
      />
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

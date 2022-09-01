import React from 'react';
import classname from 'classnames';
import style from './Setup.module.scss';
import InputError from './InputError';

export const InputField = ({
  error,
  onChange,
  value,
  name,
  type,
  placeholder,
  width,
}: {
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  name: string;
  type?: 'text' | 'password' | 'number';
  placeholder?: string;
  width?: string;
}) => {
  return (
    <div style={{ height: '40px', width, marginTop: '10px' }}>
      <input
        type={type || 'text'}
        placeholder={placeholder || ''}
        className={classname(
          'outline-none focus:outline-none bg-f1 w-full rounded-10 h-full text-14 pl-4 pr-4',
          style.subjectInput
        )}
        value={value}
        name={name}
        onChange={onChange}
      />
      <InputError error={error} />
    </div>
  );
};
export default InputField;

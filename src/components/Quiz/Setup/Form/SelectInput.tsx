import React from 'react';
import { Select, SelectProps } from 'antd';
import { InputError } from './InputError';
import { Label } from './Label';
import type { LabelProps } from './Label';
import cn from 'classnames';

interface SelectInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
  label?: LabelProps;
  options?: SelectProps['options'];
}

export const SelectInput = ({
  value,
  placeholder,
  onChange,
  error,
  label,
  options,
}: SelectInputProps) => {
  return (
    <div className={cn('relative my-2 w-full')}>
      {label && <Label {...label} />}
      <Select
        onChange={onChange}
        placeholder={placeholder}
        size="large"
        status={error && 'error'}
        style={{ fontSize: '14px' }}
        options={options}
        defaultValue={value}
        className="w-full"
      />
      <InputError error={error} />
    </div>
  );
};

export default SelectInput;

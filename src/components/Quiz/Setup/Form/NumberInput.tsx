import React from 'react';
import { InputNumber } from 'antd';
import { InputError } from './InputError';
import { Label } from './Label';
import type { LabelProps } from './Label';
import cn from 'classnames';

interface NumberInputProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (values: string | null) => void;
  error?: string;
  label?: LabelProps;
}

export const NumberInput = ({
  name,
  value,
  placeholder,
  onChange,
  error,
  label,
}: NumberInputProps) => {
  return (
    <div className={cn('relative my-2 w-full')}>
      {label && <Label {...label} />}
      <InputNumber
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="large"
        status={error && 'error'}
        style={{ fontSize: '14px' }}
        className="w-full"
        min={'1'}
        max="100"
      />
      <InputError error={error} />
    </div>
  );
};

export default NumberInput;

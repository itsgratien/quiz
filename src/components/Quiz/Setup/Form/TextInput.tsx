import React from 'react';
import { Input } from 'antd';
import { InputError } from './InputError';
import { Label } from './Label';
import type { LabelProps } from './Label';
import cn from 'classnames';

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'email';
  error?: string;
  label?: LabelProps;
}

export const TextInput = ({
  name,
  value,
  placeholder,
  onChange,
  type,
  error,
  label,
}: TextInputProps) => {
  return (
    <div className={cn('relative my-2')}>
      {label && <Label {...label} />}
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        size="large"
        status={error && 'error'}
        style={{ fontSize: '14px' }}
      />
      <InputError error={error} />
    </div>
  );
};

export default TextInput;

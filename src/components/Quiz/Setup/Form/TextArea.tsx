import React from 'react';
import { Input } from 'antd';
import { InputError } from './InputError';
import { Label } from './Label';
import type { LabelProps } from './Label';
import cn from 'classnames';

interface TextAreaProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  label?: LabelProps;
  textAreaClassName?: string;
  textAreaStyles?: React.CSSProperties;
}

export const TextArea = ({
  name,
  value,
  placeholder,
  onChange,
  error,
  label,
  textAreaClassName,
  textAreaStyles,
}: TextAreaProps) => {
  return (
    <div className={cn('relative my-2 w-full')}>
      {label && <Label {...label} />}
      <Input.TextArea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="large"
        status={error && 'error'}
        style={{ fontSize: '14px', ...textAreaStyles }}
        className={textAreaClassName}
      />
      <InputError error={error} />
    </div>
  );
};

export default TextArea;

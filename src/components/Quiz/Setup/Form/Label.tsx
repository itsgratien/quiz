import React from 'react';
import cn from 'classnames';
import { Icon } from '@iconify/react';

export interface LabelProps {
  required?: boolean;
  name: string;
}

export const Label = ({ required, name }: LabelProps) => {
  return (
    <div className={cn('relative flex items-center mb-1')}>
      <span className={cn('text-black text-14')}>{name}</span>
      {required && <span className={cn('text-red-500')}>*</span>}
    </div>
  );
};

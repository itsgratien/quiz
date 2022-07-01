import React from 'react';

export interface TLoginProps {
  open: boolean;
  handleClose: () => void;
}

export interface InputPropsT {
  placeholder?: string;
  type: 'text' | 'password' | 'email' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name?: string;
  error?: string;
  marginTop?: string;
  inputheight?: number;
}

export interface SelectInputMenuT {
  value: string;
  name: string;
}
export interface SelectInputPropsT {
  label: string;
  name: string;
  error?: string;
  onChange: (e: any) => void;
  placeholder?: string;
  value: string;
  items: SelectInputMenuT[];
}

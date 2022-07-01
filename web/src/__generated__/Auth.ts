import React from 'react';

export interface TLoginProps {
  open: boolean;
  handleClose: () => void;
}

export interface TInputProps {
  placeholder?: string;
  type: 'text' | 'password' | 'email';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name?: string;
  error?: string;
  marginTop?: string;
  inputheight?: number;
}

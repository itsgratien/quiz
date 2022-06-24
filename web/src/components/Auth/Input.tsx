import React from 'react';
import { TInputProps } from '@/generated/Auth';
import TextField from '@mui/material/TextField';
import style from './Style.module.scss';
import { styled } from '@mui/material/styles';

const CustomInput = styled(TextField)({
  '& label': {
    color: 'black',
    fontFamily: '"Quicksand", sans-serif',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  '& label.Mui-focused': {
    color: 'black',
  },
  '& input': {
    height: '40px',
    fontFamily: '"Quicksand", sans-serif',
    fontSize: '13px',
  },
  '& .MuiFilledInput-root, .MuiInputBase-root': {
    borderRadius: '5px',
    ':before': {
      borderBottom: 'none',
    },
  },
});

export const Input = ({ onChange, value, label, type, name }: TInputProps) => {
  return (
    <div className={style.inputField}>
      <CustomInput
        onChange={onChange}
        value={value}
        label={label}
        type={type}
        variant="filled"
        name={name}
        size="medium"
        fullWidth
        placeholder={label}
      />
    </div>
  );
};

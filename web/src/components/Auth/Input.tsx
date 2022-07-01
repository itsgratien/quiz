import React from 'react';
import { InputPropsT } from '@/generated/Auth';
import TextField from '@mui/material/TextField';
import style from './Style.module.scss';
import { styled } from '@mui/material/styles';

interface InputHeightT {
  inputheight?: number;
}

const s = styled(TextField);

const CustomInput = s(({ inputheight }: InputHeightT) => {
  return {
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
      height: `${inputheight || 40}px`,
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '13px',
    },
    '& .MuiFilledInput-root, .MuiInputBase-root': {
      borderRadius: '5px',
      ':before': {
        borderBottom: 'none',
      },
    },
  };
});

export const Input = ({
  onChange,
  value,
  label,
  type,
  name,
  error,
  marginTop,
  inputheight,
}: InputPropsT) => {
  return (
    <div className={style.inputField} style={{ marginTop: marginTop || '0px' }}>
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
        color={error ? 'warning' : 'primary'}
        inputheight={inputheight}
        error={error ? true : false}
      />
    </div>
  );
};

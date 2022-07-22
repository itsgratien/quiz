import React from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectInputPropsT } from '@/generated/User';

export const SelectInput = ({
  name,
  label,
  onChange,
  placeholder,
  items,
}: SelectInputPropsT) => {
  return (
    <Select
      name={name}
      label={label}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
    >
      {items.length > 0 &&
        items.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.name}
          </MenuItem>
        ))}
    </Select>
  );
};

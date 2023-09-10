import React from 'react';
import { DatePicker } from 'antd';
import { InputError } from './InputError';
import type { LabelProps } from './Label';
import { Label } from './Label';
import cn from 'classnames';
import styles from './Form.module.scss';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isEmpty } from 'lodash';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

interface DateRangeInputProps {
  error?: string;
  label?: LabelProps;
  values: string[];
  onChange: (values: string[]) => void;
}

export const DateRangeInput = ({
  error,
  label,
  values,
  onChange,
}: DateRangeInputProps) => {
  const start = dayjs(isEmpty(values[0]) ? undefined : values[0]);

  const end = dayjs(isEmpty(values[1]) ? undefined : values[1]);

  return (
    <div className={cn('relative z-50 w-full my-2')}>
      {label && <Label {...label} />}
      <RangePicker
        size="large"
        format="YYYY-MM-DD"
        mode={['date', 'date']}
        className={cn('w-full', styles.rangePicker)}
        value={[start, end]}
        onChange={(_value, dateString) => {
          onChange(dateString);
        }}
      />
      <InputError error={error} />
    </div>
  );
};
export default DateRangeInput;

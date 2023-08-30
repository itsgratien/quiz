import React from 'react';
import classname from 'classnames';
import style from './Setup.module.scss';
import { Icon } from '@iconify/react';

const DateInput = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  const defaultName = 'click to select date';

  const [name, setName] = React.useState<string>(defaultName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setName(defaultName);
    } else {
      setName(e.target.value);
    }

    onChange(e.target.value);
  };

  React.useEffect(() => {
    if (value && value.length > 0 && value !== '') {
      setName(value);
    }
  }, [value]);

  return (
    <div
      className={classname(
        'relative w-full bg-f1 rounded-10',
        style.datePicker
      )}
    >
      <button
        type="button"
        className={classname(
          'outline-none focus:outline-none absolute top-0 right-0 left-0 h-full bg-f1 rounded-10 flex items-center justify-between w-full',
          style.buttonField
        )}
      >
        <span
          className={classname('text-13')}
          style={{
            color: name === defaultName ? 'rgba(0, 0, 0, 0.3)' : 'black',
          }}
        >
          {name}
        </span>
        <Icon
          icon="clarity:date-outline-badged"
          fontSize={20}
          color="#00000059"
        />
      </button>
      <input
        type="date"
        placeholder="start date"
        className={classname(
          style.date,
          'w-full h-full outline-none focus:outline-none cursor-pointer'
        )}
        onChange={handleChange}
      />
    </div>
  );
};
export default DateInput;

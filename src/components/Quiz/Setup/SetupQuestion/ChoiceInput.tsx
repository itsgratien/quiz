import React from 'react';
import style from './SetupQuestion.module.scss';
import classname from 'classnames';
import InputError from '../InputError';
import { Icon } from '@iconify/react';

export const ChoiceInput = ({
  error,
  onChange,
  value,
}: {
  error?: string;
  onChange: (value: string) => void;
  value: string;
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const options = () => {
    const items = [];

    for (let i = 2; i <= 5; i++) {
      items.push(i);
    }

    return items;
  };

  const handleClick = (value: number) => {
    onChange(String(value));
    setOpen(false);
  };

  return (
    <div className={classname(style.choiceInputGroup, 'relative mt-11')}>
      <div className="relative" style={{ width: '150px' }}>
        <div
          className={classname(
            'relative flex justify-between items-center rounded-10 bg-f1 w-full',
            style.choiceInput
          )}
          onClick={() => setOpen(!open)}
        >
          <span className="text-13">{value}</span>
          <Icon
            icon={open ? 'bi:caret-up-fill' : 'bi:caret-down-fill'}
            fontSize={16}
          />
        </div>
        {open && (
          <div className={classname('absolute bg-white z-10', style.options)}>
            <ul className="relative">
              {options().map((item) => (
                <li
                  key={item}
                  onClick={() => handleClick(item)}
                  className={classname(item === Number(value) ? 'bg-f1' : '')}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <InputError error={error} />
    </div>
  );
};
export default ChoiceInput;

import React from 'react';
import classname from 'classnames';
import style from './Setup.module.scss';
import { Icon } from '@iconify/react';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

export const Button = ({
  name,
  type,
  className,
  icon,
  handleClick,
  disabled,
}: {
  name: string;
  type?: 'button' | 'submit';
  className?: 'primary' | 'next' | 'accept' | 'close';
  icon?: {
    name: string;
    color: string;
  };
  handleClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type || 'button'}
      className={classname(
        'outline-none focus:outline-none rounded-10 text-14 font-bold text-black',
        style.button,
        style[className || 'next'],
        icon && 'flex items-center justify-center'
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {!disabled ? (
        <>
          {' '}
          {icon ? (
            <>
              <Icon icon={icon.name} fontSize={30} color={icon.color} />
              <span className="text-14 font-bold text-black ml-2">{name}</span>
            </>
          ) : (
            <>{name}</>
          )}
        </>
      ) : (
        <LoadingSpinner size={30} />
      )}
    </button>
  );
};
export default Button;

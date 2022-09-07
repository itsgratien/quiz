import * as React from 'react';
import classname from 'classnames';
import style from './Quiz.module.scss';

export const LoadMoreButton = ({
  name,
  handleClick,
  align,
  marginTop,
  className,
  disabled,
}: {
  name?: string;
  handleClick?: () => void;
  align?: 'center' | 'start' | 'end';
  marginTop?: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <div
      className={classname(
        `relative flex justify-${align} items-center w-full`,
        className
      )}
      style={{ marginTop: marginTop || '0' }}
    >
      <button
        type="button"
        className={classname(
          'uppercase outline-none focus:outline-none text-14 font-bold flex items-center justify-center',
          style.loadMoreButton
        )}
        onClick={handleClick}
        disabled={disabled}
      >
        {name || 'Load More'}
      </button>
    </div>
  );
};
export default LoadMoreButton;

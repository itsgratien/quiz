import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import classname from 'classnames';

const LoadingSpinner = ({
  justify,
  color,
  size,
}: {
  justify?: 'center' | 'start' | 'end';
  color?: string;
  size?: number;
}) => {
  return (
    <div
      className={classname(
        'flex items-center',
        `justify-${justify || 'center'}`
      )}
    >
      <MoonLoader color={color || 'black'} size={size || 80} />
    </div>
  );
};
export default LoadingSpinner;

import React from 'react';
import classname from 'classnames';
import style from './Quiz.module.scss';

const RightButtons = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: any;
}) => {
  return (
    <div className={classname('absolute top-0', style.rightButtons, className)}>
      {children}
    </div>
  );
};
export default RightButtons;

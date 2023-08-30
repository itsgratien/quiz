import * as React from 'react';
import classname from 'classnames';
import style from './Quiz.module.scss';

export const ViewMore = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: any;
}) => {
  return (
    <div className={classname('absolute', style.viewMore, className)}>
      {children}
    </div>
  );
};
export default ViewMore;

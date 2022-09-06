import React from 'react';
import style from './View.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';

export const NotFound = ({
  message,
  alignItem,
}: {
  message?: string;
  alignItem?: 'center' | 'start' | 'end';
}) => {
  return (
    <div
      className={classname(
        'relative m-auto flex flex-col',
        `items-${alignItem || 'center'}`,
        style.notFound
      )}
    >
      <Icon
        icon="majesticons:paper-fold-line"
        fontSize={100}
        color="rgba(0, 0, 0, 0.5)"
      />
      <span className={classname('text-12')} style={{ marginTop: '26px' }}>
        {message || 'No Result Found'}
      </span>
    </div>
  );
};
export default NotFound;

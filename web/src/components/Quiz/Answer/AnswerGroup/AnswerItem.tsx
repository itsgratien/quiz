import * as React from 'react';
import classname from 'classnames';
import style from './AnswerGroup.module.scss';
import { Icon } from '@iconify/react';

const AnswerItem = ({
  value,
  success,
}: {
  value: string;
  success?: boolean;
}) => {
  return (
    <div
      className={classname(
        'relative flex items-center justify-between rounded-10',
        style.answerItem
      )}
    >
      <span className={classname('text-14', style.value)}>{value}</span>
      {typeof success !== 'undefined' && (
        <Icon
          icon={
            success ? 'akar-icons:circle-check-fill' : 'ep:circle-close-filled'
          }
          fontSize={40}
          color={success ? '#00B76A' : '#FF001F'}
        />
      )}
    </div>
  );
};

export default AnswerItem;

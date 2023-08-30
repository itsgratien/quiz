import * as React from 'react';
import style from './Header.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';

const Notification = () => {
  return (
    <div className={classname('relative', style.notification)}>
      <div>
        <button
          type="button"
          className={classname('relative flex justify-between')}
        >
          <div className="relative">
            <Icon icon="carbon:notification" fontSize={40} />
            <div
              className={classname('bg-red-600 absolute top-0', style.circle)}
            ></div>
          </div>
          <div className={classname('relative', style.text)}>
            <div>New</div>
            <Icon
              icon="bi:caret-down-fill"
              fontSize={10}
              className={classname('absolute right-0', style.caret)}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Notification;

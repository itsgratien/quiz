import React from 'react';
import style from './Style.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';

const lists = [
  {
    name: 'Home',
    icon: 'ps:dashboard',
  },
  {
    name: 'Settings',
    icon: 'ion:settings',
  },
];

export const Menu = () => {
  return (
    <div className={classname('fixed top-0', style.menu)}>
      <div className={style.user}>
        <small>Hello</small>
        <div className={classname('font-bold', style.name)}>
          Gratien Tuyishimire
        </div>
      </div>
      <div className={classname(style.nav)}>
        <ul className={style.ul}>
          {lists.map((item, itemKey) => (
            <li key={itemKey} className={classname('flex')}>
              <Icon icon={item.icon} fontSize={30} />
              <span className="font-bold">{item.name}</span>
            </li>
          ))}
        </ul>
        <div
          className="flex items-center justify-center flex-col absolute w-full"
          style={{ bottom: '20px' }}
        >
          <button
            type="button"
            className={classname(
              'outline-none focus:outline-none flex items-center justify-center',
              style.addBtn
            )}
          >
            <Icon icon="carbon:add" fontSize={40} />
          </button>
          <button
            type="button"
            className={classname(
              'font-bold outline-none focus:outline-none',
              style.logoutBtn
            )}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

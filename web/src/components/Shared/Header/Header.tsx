import React from 'react';
import { Icon } from '@iconify/react';
import style from './Header.module.scss';
import classname from 'classnames';
import Search from './Search';
import Notification from './Notification';

const Header = () => {
  return (
    <header
      className={classname(
        'relative w-full flex justify-between',
        style.header
      )}
    >
      <div className={classname('flex cursor-pointer', style.menu)}>
      <Icon icon="bx:menu-alt-left" fontSize={24} />
        <span className='ml-1 font-bold'>Menu</span>
      </div>
      <Search />
      <div className={classname('flex justify-between')}>
        <Notification />
        <div>
          <button type="button" className={classname('flex items-start')}>
            <Icon icon="uit:signout" fontSize={24} />
            <span className='font-bold ml-1'>Signout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;

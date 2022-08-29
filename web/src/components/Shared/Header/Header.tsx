import React from 'react';
import { Icon } from '@iconify/react';
import style from './Header.module.scss';
import classname from 'classnames';
import Search from './Search';
import Notification from './Notification';

const Header = () => {
  const [fixed, setFixed] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 60) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };
  }, []);

  return (
    <header
      className={classname(
        'w-full flex justify-between top-0 bg-white z-50',
        style.header,
        fixed ? 'fixed' : 'relative'
      )}
    >
      <div className={classname('flex cursor-pointer', style.menu)}>
        <Icon icon="bx:menu-alt-left" fontSize={24} />
        <span className="ml-1 font-bold">Menu</span>
      </div>
      <Search />
      <div className={classname('flex justify-between')}>
        <Notification />
        <div>
          <button type="button" className={classname('flex items-start')}>
            <Icon icon="uit:signout" fontSize={24} />
            <span className="font-bold ml-1">Signout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;

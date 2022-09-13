import React from 'react';
import classname from 'classnames';
import style from './SetupButton.module.scss';

const SetupMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classname(style.setupMenu, 'relative')}>
      <ul className="bg-white">{children}</ul>
    </div>
  );
};
export default SetupMenu;

import React from 'react';
import { TLayoutProps } from '@/generated/Shared';
import { Menu } from './Menu';
import Image from 'next/image';
import classname from 'classnames';
import style from './Style.module.scss';

export const Layout = ({ children }: TLayoutProps) => {
  return (
    <div>
      <div className={classname('flex justify-between', style.header)}>
        <div className={style.logo}>
          <Image src="/logo.png" alt="logo" width={80} height={80} />
        </div>
        <Menu />
      </div>
      <div>{children}</div>
    </div>
  );
};

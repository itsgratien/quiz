import React from 'react';
import { TLayoutProps } from '@/generated/Shared';
import classname from 'classnames';
import style from './Style.module.scss';
import Header from '@/components/Shared/Header/Header';

export const Layout = ({ children }: TLayoutProps) => {
  return (
    <div>
      <Header />
      {/* <div>{children}</div> */}
    </div>
  );
};

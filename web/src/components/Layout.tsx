import React from 'react';
import { TLayoutProps } from '@/generated/Shared';
import Header from '@/components/Shared/Header/Header';

export const Layout = ({ children }: TLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

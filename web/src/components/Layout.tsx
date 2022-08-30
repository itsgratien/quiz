import React from 'react';
import { TLayoutProps } from '@/generated/Shared';
import Header from '@/components/Shared/Header/Header';
import GoBack from './Shared/GoBack';
import { useRouter } from 'next/router';
import style from './Style.module.scss';

export const Layout = ({ children, goBack }: TLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Header />
      <main>
        {goBack && (
          <div className={style.back}>
            <GoBack handleClick={() => router.back()} />
          </div>
        )}
        {children}
      </main>
    </>
  );
};

export default Layout;

'use client';
import React from 'react';
import { LayoutProps } from '@/generated/Shared';
import Header from '@/components/Shared/Header/Header';
import GoBack from './Shared/GoBack';
import { useRouter } from 'next/router';
import style from './Style.module.scss';
import Setup from './Quiz/Setup';
import SetupButtonContainer from './SetupButton/SetupButtonContainer';
import { useSSR } from '@/hooks/useSSR';

export const Layout = ({ children, goBack, showSetupButton }: LayoutProps) => {
  const [open, setOpen] = React.useState<boolean>(true);

  const router = useRouter();

  const isSSR = useSSR();

  if (isSSR) {
    return <></>;
  }

  return (
    <>
      {open && <Setup open={open} onClose={() => setOpen(false)} />}
      <Header />
      <main>
        {goBack && (
          <div className={style.back}>
            <GoBack handleClick={() => router.back()} />
          </div>
        )}

        <div style={{ paddingBottom: '100px' }}> {children}</div>
        {showSetupButton && (
          <SetupButtonContainer>
            <SetupButtonContainer.AddButton handleClick={() => setOpen(true)} />
          </SetupButtonContainer>
        )}
      </main>
    </>
  );
};

export default Layout;

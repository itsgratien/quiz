'use client';
import React from 'react';
import { LayoutProps } from '@/generated/Shared';
import Header from '@/components/Shared/Header/Header';
import GoBack from '@/components/Shared/GoBack';
import { useRouter } from 'next/navigation';
import style from '@/components/Style.module.scss';
import Setup from '@/components/Quiz/Setup';
import SetupButtonContainer from '@/components/SetupButton/SetupButtonContainer';

export const Layout = ({ children, goBack, showSetupButton }: LayoutProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      {open && <Setup open={open} handleClose={() => setOpen(false)} />}
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

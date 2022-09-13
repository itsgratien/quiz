import React from 'react';
import { LayoutProps } from '@/generated/Shared';
import Header from '@/components/Shared/Header/Header';
import GoBack from './Shared/GoBack';
import { useRouter } from 'next/router';
import style from './Style.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';
import Setup from './Quiz/Setup/Setup';

export const Layout = ({ children, goBack, setup, edit }: LayoutProps) => {
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
        <div className={classname('fixed bottom-0', style.setup)}>
          {edit && (
            <button
              type="button"
              className={classname(
                'relative outline-none focus:outline-none bg-f1 rounded-full flex items-center justify-center',
                style.edit
              )}
              onClick={edit}
            >
              <Icon icon="bx:dots-horizontal" fontSize={35} />
            </button>
          )}

          {setup && (
            <button
              type="button"
              className={classname(
                'relative outline-none focus:outline-none bg-primary rounded-full flex items-center justify-center'
              )}
              onClick={() => setOpen(true)}
            >
              <Icon icon="akar-icons:plus" fontSize={35} />
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Layout;

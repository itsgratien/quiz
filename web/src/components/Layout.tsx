import React from 'react';
import { TLayoutProps } from '@/generated/Shared';
import Header from '@/components/Shared/Header/Header';
import GoBack from './Shared/GoBack';
import { useRouter } from 'next/router';
import style from './Style.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';

export const Layout = ({ children, goBack }: TLayoutProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <Header />
      <main className="mb-5">
        {goBack && (
          <div className={style.back}>
            <GoBack handleClick={() => router.back()} />
          </div>
        )}

        <> {children}</>
        <div className={classname('fixed bottom-0', style.setup)}>
          <button
            type="button"
            className={classname(
              'relative outline-none focus:outline-none bg-primary rounded-full flex items-center justify-center'
            )}
          >
            <Icon icon="akar-icons:plus" fontSize={35} />
          </button>
        </div>
      </main>
    </>
  );
};

export default Layout;

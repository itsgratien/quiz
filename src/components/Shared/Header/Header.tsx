import React from 'react';
import { Icon } from '@iconify/react';
import style from './Header.module.scss';
import classname from 'classnames';
import Search from './Search';
import { useLogoutMutation } from '@/generated/graphql';
import WarningModal from '@/components/Shared/Alert/WarningAlertModal';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const Header = () => {
  const [fixed, setFixed] = React.useState<boolean>(false);

  const [warn, setWarn] = React.useState<boolean>(false);

  const router = useRouter();

  const [logoutFunc, { data: logoutResponse, loading }] = useLogoutMutation();

  const handleLogout = () => setWarn(!warn);

  const handleEnableLogout = async () => logoutFunc();

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 60) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };
  }, []);

  React.useEffect(() => {
    if (logoutResponse && logoutResponse.logout) {
      setWarn(false);
      if (logoutResponse.logout.message) {
        toast.success(logoutResponse.logout.message);
        router.push('/auth');
      }
      if (logoutResponse.logout.error) {
        toast.error(logoutResponse.logout.error);
      }
    }
  }, [logoutResponse, router]);

  return (
    <header
      className={classname(
        'w-full flex justify-between top-0 bg-white z-50',
        style.header,
        fixed ? 'fixed' : 'relative',
      )}
    >
      {warn && (
        <WarningModal
          message="Are you sure you want to logout ?"
          open={warn}
          enable={{ name: 'Yes Logout', onClick: handleEnableLogout, loading }}
          disable={{ name: 'Cancel', onClick: handleLogout }}
          handleClose={handleLogout}
        />
      )}
      <div className={classname('flex cursor-pointer', style.menu)}>
        <Icon icon="bx:menu-alt-left" fontSize={24} />
        <span className="ml-1 font-bold">Menu</span>
      </div>
      <Search />
      <div className={classname('flex justify-between')}>
        <div>
          <button
            type="button"
            className={classname('flex items-start')}
            onClick={handleLogout}
          >
            <Icon icon="uit:signout" fontSize={24} />
            <span className="font-bold ml-1">Signout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;

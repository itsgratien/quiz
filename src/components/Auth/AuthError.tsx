import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';
import { Icon } from '@iconify/react';
import { AuthErrorPropsT } from '@/generated/User';

const AuthError = ({ error }: AuthErrorPropsT) => {
  return (
    <div className={classname('flex items-center', style.authError)}>
      <Icon icon="fluent:clipboard-error-24-regular" />
      <span>{error}</span>
    </div>
  );
};
export default AuthError;

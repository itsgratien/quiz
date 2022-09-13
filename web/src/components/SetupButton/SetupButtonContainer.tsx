import React from 'react';
import classname from 'classnames';
import style from './SetupButton.module.scss';
import SetupButton, { SetupButtonProps } from './SetupButton';

const SetupButtonContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classname('fixed bottom-0', style.setupButtonContainer)}>
      {children}
    </div>
  );
};

SetupButtonContainer.Add = function Add(props: SetupButtonProps) {
  return <SetupButton {...props} />;
};

SetupButtonContainer.EditButton = function Edit(props: SetupButtonProps) {
  return <SetupButton {...props} isEdit />;
};

export default SetupButtonContainer;

'use client';
import React from 'react';
import classname from 'classnames';
import style from './SetupButton.module.scss';
import SetupButton, { SetupButtonProps } from './SetupButton';
import SetupMenu from './SetupMenu';

const SetupButtonContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classname('fixed bottom-0', style.setupButtonContainer)}>
      {children}
    </div>
  );
};

SetupButtonContainer.AddButton = function Add(props: SetupButtonProps) {
  return <SetupButton {...props} />;
};

SetupButtonContainer.EditButton = function Edit(props: SetupButtonProps) {
  return <SetupButton {...props} isEdit />;
};

SetupButtonContainer.Menu = function Menu(props: {
  children: React.ReactNode;
}) {
  return <SetupMenu {...props} />;
};
export default SetupButtonContainer;

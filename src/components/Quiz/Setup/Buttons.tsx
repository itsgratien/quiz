import React from 'react';
import { Button } from 'antd';
import { useSetup } from '@/hooks/useSetup';
import cn from 'classnames';
import styles from './Setup.module.scss';

interface ButtonsProps {
  showBackButton?: boolean;
  submitButton: {
    name?: string;
    onClick?: () => void;
  };
  backButton?: {
    show?: boolean;
    onClick?: () => void;
  };
}
export const Buttons = ({ backButton, submitButton }: ButtonsProps) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-end mt-4',
        styles.buttons,
      )}
    >
      <Button
        type="primary"
        className={cn('!text-black bg-primary !text-14 font-bold')}
        size="large"
        onClick={() => submitButton.onClick && submitButton.onClick()}
      >
        {submitButton.name || 'Continue'}
      </Button>
      {backButton?.show && (
        <Button
          size="large"
          className={cn('!text-black !text-14 font-bold ml-5')}
          onClick={backButton.onClick}
        >
          Back
        </Button>
      )}
    </div>
  );
};
export default Buttons;

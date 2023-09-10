import React from 'react';
import { Button } from 'antd';
import { useSetup } from '@/hooks/useSetup';
import cn from 'classnames';
import styles from './Setup.module.scss';

export const Buttons = () => {
  const { step } = useSetup();

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
      >
        {step !== 2 ? 'Continue' : 'Submit'}
      </Button>
      {step !== 0 ? <Button size="large">Back</Button> : <></>}
    </div>
  );
};
export default Buttons;

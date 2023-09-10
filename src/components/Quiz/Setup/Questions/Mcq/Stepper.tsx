import React from 'react';
import { Steps, StepProps } from 'antd';
import { useAddMcq } from '@/hooks/useSetup';
import cn from 'classnames';
import styles from '../../Setup.module.scss';

export const Stepper = () => {
  const { step } = useAddMcq();

  const items: StepProps[] = [
    { title: 'Main Details', className: cn(styles.step) },
    { title: 'Choices', className: cn(styles.step) },
    { title: 'Preview & Confirm', className: cn(styles.step) },
  ];

  return <Steps items={items} current={step} />;
};
export default Stepper;

import React from 'react';
import { Steps, StepProps } from 'antd';
import { useSetup } from '@/hooks/useSetup';
import cn from 'classnames';
import styles from './Setup.module.scss';

export const Stepper = () => {
  const { step } = useSetup();

  const items: StepProps[] = [
    { title: 'Assessment Details', className: cn(styles.step) },
    { title: 'Questions', className: cn(styles.step) },
    { title: 'Candidates', className: cn(styles.step) },
  ];

  return <Steps items={items} current={step} />;
};
export default Stepper;

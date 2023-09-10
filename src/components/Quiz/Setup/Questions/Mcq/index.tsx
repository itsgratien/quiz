import React from 'react';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import type { AddMcqValues, AddMcqContextValue } from '@/generated/Quiz';
import cn from 'classnames';
import McqForm from './Form';
import Stepper from './Stepper';
import { AddMcqContext } from '@/contexts/SetupContext';
import Choice from './Choice';

interface McqProps {
  open: boolean;
  onClose: () => void;
}

export const Mcq = ({ open, onClose }: McqProps) => {
  const [step, setStep] = React.useState<number>(1);

  const formik = useFormik<AddMcqValues>({
    initialValues: {
      title: '',
      points: '',
      choiceType: '',
      choices: ['', ''],
      description: '',
      choiceNumber: 2,
      answers: [],
    },
    onSubmit: (values) => {},
  });

  const manageStep = (currentStep?: number) => {
    switch (currentStep) {
      case 1:
        return <Choice />;

      default:
        return (
          <McqForm
            formik={formik}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
          />
        );
    }
  };

  const addMcqContextValue: AddMcqContextValue = React.useMemo(
    () => ({
      setStep,
      step,
    }),
    [step, setStep],
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      maskClosable={false}
      width={800}
      footer={false}
    >
      <AddMcqContext.Provider value={addMcqContextValue}>
        <AddMcqContext.Consumer>
          {(val) => (
            <div className={cn('p-20 pb-0')}>
              <Stepper />
              <div className={cn('mt-7')}>{manageStep(val.step)}</div>
            </div>
          )}
        </AddMcqContext.Consumer>
      </AddMcqContext.Provider>
    </Modal>
  );
};
export default Mcq;

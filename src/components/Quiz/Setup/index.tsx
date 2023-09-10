'use client';
import React from 'react';
import { SetupContext } from '@/contexts/SetupContext';
import SetupQuiz from './SetupQuiz';
import ViewAssignedQuestion from './View/ViewAssignedQuestion';
import ViewInvitedCandidate from './View/ViewInvitedCandidate';
import { useGetSingleTestLazyQuery, Test } from '@/generated/graphql';
import { toast } from 'react-hot-toast';
import Stepper from './Stepper';
import { Modal } from 'antd';
import cn from 'classnames';
import styles from './Setup.module.scss';
import { Buttons } from './Buttons';

interface SetupProps {
  open: boolean;
  onClose?: () => void;
  slug?: string;
  loading?: boolean;
}

const Setup = ({ open, slug, onClose }: SetupProps) => {
  const [step, setStep] = React.useState<number>(0);

  const [test, setTest] = React.useState<Test>();

  const [getSingleTest, { loading, data }] = useGetSingleTestLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const handleTest = (values: Test) => {
    setTest(values);
  };

  React.useEffect(() => {
    if (slug) {
      getSingleTest({ variables: { slug } });
    }
  }, [slug, getSingleTest]);

  React.useEffect(() => {
    if (data && data.getSingleTest) {
      if (data.getSingleTest.error) {
        toast.error(data.getSingleTest.error);
      }
      if (data.getSingleTest.data) {
        setTest(data.getSingleTest.data as Test);
      }
    }
  }, [data]);

  return (
    <Modal open={open} footer={false} width={800} onCancel={onClose}>
      <div className={cn('relative p-12 py-20 pb-1')}>
        <SetupContext.Provider
          value={{
            step,
            test,
            handleTest,
            loading,
          }}
        >
          <SetupContext.Consumer>
            {(value) => (
              <>
                <Stepper />
                <div className={cn('p-5')}>
                  <SetupQuiz />
                  <Buttons />
                </div>
              </>
            )}
          </SetupContext.Consumer>
        </SetupContext.Provider>
      </div>
    </Modal>
  );
};
export default Setup;

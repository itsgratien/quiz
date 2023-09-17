'use client';
import React from 'react';
import { SetupContext } from '@/contexts/SetupContext';
import SetupQuiz from './SetupQuiz';
import ViewInvitedCandidate from './View/ViewInvitedCandidate';
import { useGetSingleTestLazyQuery, Test } from '@/generated/graphql';
import { toast } from 'react-hot-toast';
import Stepper from './Stepper';
import { Modal } from 'antd';
import cn from 'classnames';
import Spinner from '@/components/Shared/LoadingSpinner';
const Questions = React.lazy(() => import('./Questions'));

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

  const manageStep = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return <SetupQuiz />;

      case 1:
        return (
          <React.Suspense fallback={<Spinner size={50} />}>
            <Questions />
          </React.Suspense>
        );

      case 2:
        return <ViewInvitedCandidate />;
      default:
        return <SetupQuiz />;
    }
  };

  return (
    <Modal open={open} footer={false} width={800} onCancel={onClose}>
      <div className={cn('relative px-12 py-20 pb-0')}>
        <SetupContext.Provider
          value={{
            step,
            test,
            handleTest,
            loading,
            setStep
          }}
        >
          <SetupContext.Consumer>
            {(value) => (
              <>
                <Stepper />
                <div className={cn('px-5')}>{manageStep(value.step)}</div>
              </>
            )}
          </SetupContext.Consumer>
        </SetupContext.Provider>
      </div>
    </Modal>
  );
};
export default Setup;

import * as React from 'react';
import classname from 'classnames';
import style from '../Setup.module.scss';
import Modal from '../ModalContainer';
import Button from '../Button';
import { SetupQuizSchema } from '../Schema';
import { useFormik } from 'formik';
import { useSetupTestMutation, Test } from '@/generated/graphql';
import Form from './Form';
import { SetupProps } from '@/generated/Shared';
import TitleInput from './TitleInput';
import useSetup from '@/hooks/useSetup';
import { SetupStep } from '@/generated/Enum';
import { toast } from 'react-hot-toast';
import { get } from 'lodash';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import { format } from 'date-fns';

const SetupQuiz = ({ open, handleClose, loading: loadingProp }: SetupProps) => {
  const [registerQuiz, { data, loading }] = useSetupTestMutation();

  const setup = useSetup();

  const { test, handleStep } = setup;

  const handleFormatDate = (value?: string) => {
    if (value) {
      return format(new Date(value), 'yyyy-MM-dd');
    } else {
      return format(new Date(), 'yyyy-MM-dd');
    }
  };

  const handleSubmitFunc = React.useCallback(
    async (values: any) => {
      if (test) {
        if (handleStep) {
          handleStep(SetupStep.Question);
        }
      } else {
        await registerQuiz({
          variables: { ...values, passMark: Number(values.passMark) },
        });
      }
    },
    [test, registerQuiz, handleStep],
  );

  const formik = useFormik({
    validationSchema: SetupQuizSchema,
    initialValues: {
      title: '',
      startDate: handleFormatDate(),
      endDate: '',
      subject: '',
      passMark: '',
    },
    onSubmit: handleSubmitFunc,
    validateOnChange: false,
  });

  const { errors, setValues } = formik;

  React.useEffect(() => {
    if (test) {
      setValues({
        title: get(test, 'title', ''),
        startDate: test.startDate ? handleFormatDate(test.startDate) : '',
        endDate: test.endDate ? handleFormatDate(test.endDate) : '',
        subject: get(test, 'subject', ''),
        passMark: String(test?.passMark ?? ''),
      });
    }
  }, [test, setValues]);

  React.useEffect(() => {
    if (data?.addTest && setup.handleStep && setup.handleTest) {
      if (data.addTest.data) {
        setup.handleStep(SetupStep.Question);
        setup.handleTest(data.addTest.data as Test);
      }
      if (data.addTest.error) {
        toast.error(data.addTest.error);
      }
    }
  }, [data, setup]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        <Button
          name="Save & Continue"
          className="primary"
          type="submit"
          handleClick={formik.handleSubmit}
          disabled={loading}
        />
      }
      leftElement={<TitleInput formik={formik} error={errors.title} />}
    >
      <div
        className={classname(
          'relative flex flex-col items-center',
          style.setup,
          style.setupQuiz,
        )}
      >
        {loadingProp ? (
          <LoadingSpinner />
        ) : (
          <Form formik={formik} errors={errors} />
        )}
      </div>
    </Modal>
  );
};

export default SetupQuiz;

import * as React from 'react';
import classname from 'classnames';
import style from '../Setup.module.scss';
import Modal from '../ModalContainer';
import Button from '../Button';
import { SetupQuizSchema } from '../Schema';
import { useFormik } from 'formik';
import { useSetupTestMutation } from '@/generated/graphql';
import Form from './Form';
import { SetupProps } from '@/generated/Shared';
import TitleInput from './TitleInput';
import useSetup from '@/hooks/useSetup';
import { SetupStep } from '@/generated/Enum';

const SetupQuiz = ({ open, handleClose }: SetupProps) => {
  const [registerQuiz, { data, loading }] = useSetupTestMutation();

  const setup = useSetup();

  const formik = useFormik({
    validationSchema: SetupQuizSchema,
    initialValues: { title: '', startDate: '', endDate: '', subject: '' },
    onSubmit: async (values) => {
      await registerQuiz({ variables: values });
    },
    validateOnChange: false,
  });

  const { errors } = formik;

  React.useEffect(() => {
    if (
      data &&
      data.addTest &&
      setup.handleStep &&
      setup.handleTest &&
      data.addTest.data
    ) {
      setup.handleStep(SetupStep.Question);
      setup.handleTest(data.addTest.data._id);
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
          style.setupQuiz
        )}
      >
        <Form formik={formik} errors={errors} />
      </div>
    </Modal>
  );
};

export default SetupQuiz;

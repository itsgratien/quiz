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
import { toast } from 'react-hot-toast';
import { get } from 'lodash';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

const SetupQuiz = ({
  open,
  handleClose,
  slug,
  loading: loadingProp,
}: SetupProps) => {
  const [registerQuiz, { data, loading }] = useSetupTestMutation();

  const setup = useSetup();

  const { test } = setup;

  const formik = useFormik({
    validationSchema: SetupQuizSchema,
    initialValues: {
      title: get(test, 'title', ''),
      startDate: get(test, 'startDate', ''),
      endDate: get(test, 'endDate', ''),
      subject: get(test, 'subject', ''),
    },
    onSubmit: async (values) => {
      await registerQuiz({ variables: values });
    },
    validateOnChange: false,
  });

  const { errors, values } = formik;

  React.useEffect(() => {
    if (data && data.addTest && setup.handleStep && setup.handleTest) {
      if (data.addTest.data) {
        setup.handleStep(SetupStep.Question);
        setup.handleTest({
          _id: data.addTest.data._id,
          title: data.addTest.data.title,
          slug: data.addTest.data.slug,
          subject: data.addTest.data.subject,
          startDate: data.addTest.data.startDate,
          endDate: data.addTest.data.endDate
        });
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
          style.setupQuiz
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

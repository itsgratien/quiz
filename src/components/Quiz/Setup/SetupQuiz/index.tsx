import * as React from 'react';
import classname from 'classnames';
import { SetupQuizSchema } from '../Schema';
import { useFormik } from 'formik';
import { useSetupTestMutation, Test } from '@/generated/graphql';
import Form from './Form';
import useSetup from '@/hooks/useSetup';
import { get } from 'lodash';
import { format } from 'date-fns';

const SetupQuiz = () => {
  const [registerQuiz, { data, loading }] = useSetupTestMutation();

  const setup = useSetup();

  const { test, setStep, handleTest } = setup;

  const handleFormatDate = (value?: string) => {
    if (value) {
      return format(new Date(value), 'yyyy-MM-dd');
    } else {
      return format(new Date(), 'yyyy-MM-dd');
    }
  };

  const onSubmit = React.useCallback(
    async (values: any) => {
      await registerQuiz({
        variables: { ...values, passMark: Number(values.passMark) },
      });
    },
    [registerQuiz],
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
    onSubmit,
    validateOnChange: false,
  });

  const { errors, setValues } = formik;

  React.useEffect(() => {
    if (test) {
      setValues({
        title: get(test, 'title', ''),
        startDate: test.startDate ?? '',
        endDate: test.endDate ?? '',
        subject: get(test, 'subject', ''),
        passMark: String(test?.passMark ?? ''),
      });
    }
  }, [test, setValues]);

  React.useEffect(() => {
    if (data?.addTest && setStep && handleTest) {
      if (data.addTest.data) {
        setStep(1);
        handleTest(data.addTest.data as Test);
      }
    }
  }, [data, setStep, handleTest]);

  return (
    <div className={classname('relative')}>
      <Form formik={formik} errors={errors} values={formik.values} />
    </div>
  );
};

export default SetupQuiz;

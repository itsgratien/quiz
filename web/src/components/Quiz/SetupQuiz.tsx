import React from 'react';
import style from './Style.module.scss';
import classname from 'classnames';
import { SetupQuizPropsT } from '@/generated/Quiz';
import Modal from '@/components/Shared/Modal';
import { SetupHeader } from './SetupHeader';
import Grid from '@mui/material/Grid';
import { Input } from '@/components/Auth/Input';
import { useFormik } from 'formik';
import { SetupQuizSchema } from './Schema';

export const SetupQuiz = ({ open, onClose }: SetupQuizPropsT) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: '',
      endDate: '',
      passMark: '',
    },
    onSubmit: () => undefined,
    validateOnChange: true,
    validationSchema: SetupQuizSchema,
  });

  const { values, errors } = formik;

  const inputHeight = 30;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classname('bg-white', style.setup)}>
        <SetupHeader title="Setup Quiz" onClose={onClose} />
        <div className={classname(style.setupForm, 'mt-7')}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Input
                  type="text"
                  placeholder="name of quiz"
                  label="Name"
                  value={values.name}
                  onChange={formik.handleChange}
                  inputheight={inputHeight}
                  name="name"
                  error={errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  type="text"
                  placeholder="starting date"
                  label="Start Date"
                  value={values.startDate}
                  onChange={formik.handleChange}
                  inputheight={inputHeight}
                  name="startDate"
                  error={errors.startDate}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  type="text"
                  placeholder="ending date"
                  label="End Date"
                  value={values.endDate}
                  onChange={formik.handleChange}
                  inputheight={inputHeight}
                  name="endDate"
                  error={errors.endDate}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  type="number"
                  placeholder="Pass Mark"
                  label="Pass Mark"
                  value={values.passMark}
                  onChange={formik.handleChange}
                  inputheight={inputHeight}
                  name="passMark"
                  error={errors.passMark}
                />
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={12}>
                <button
                  type="submit"
                  className={classname(
                    'outline-none focus:outline-none font-bold',
                    style.submitBtn
                  )}
                >
                  Next
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Modal>
  );
};

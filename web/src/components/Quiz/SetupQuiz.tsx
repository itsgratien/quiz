import React from 'react';
import style from './Style.module.scss';
import classname from 'classnames';
import { SetupQuizPropsT } from '@/generated/Quiz';
import Modal from '@/components/Shared/Modal';
import { SetupHeader } from './SetupHeader';
import Grid from '@mui/material/Grid';
import { Input } from '@/components/Auth/Input';
import { useFormik } from 'formik';

export const SetupQuiz = ({ open, onClose }: SetupQuizPropsT) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: '',
      endDate: '',
      time: '',
    },
    onSubmit: () => undefined,
    validateOnChange: true,
  });

  const { values } = formik;

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
                  inputHeight={inputHeight}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  type="text"
                  placeholder="starting date"
                  label="Start Date"
                  value={values.endDate}
                  onChange={formik.handleChange}
                  inputHeight={inputHeight}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  type="text"
                  placeholder="ending date"
                  label="End Date"
                  value={values.startDate}
                  onChange={formik.handleChange}
                  inputHeight={inputHeight}
                />
              </Grid>
              <Grid item xs={8}>
                <Input
                  type="text"
                  placeholder="How long this quiz will take ?"
                  label="How long this quiz will take ?"
                  value={values.time}
                  onChange={formik.handleChange}
                  inputHeight={inputHeight}
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={12}>
                <button
                  type="button"
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

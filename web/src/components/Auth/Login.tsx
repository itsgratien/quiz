import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';
import { TLoginProps } from '@/generated/Auth';
import { Modal } from '@mui/material';
import { Input } from './Input';
import { useFormik } from 'formik';

export const Login = ({ open, handleClose }: TLoginProps) => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => console.log('values'),
  });
  const { values } = formik;
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        className={classname(
          'relative flex items-center justify-center outline-none focus:outline-none h-screen'
        )}
      >
        <div className={classname('bg-white', style.login)}>
          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Email"
              value={values.email}
              onChange={formik.handleChange}
              type="email"
              name="email"
            />
            <Input
              label="Password"
              value={values.password}
              onChange={formik.handleChange}
              type="password"
              name="password"
            />
            <button
              type="button"
              className={classname(
                'outline-none focus:outline-none w-full',
                style.btn
              )}
            >
              Login
            </button>
            <button
              type="button"
              className={classname(
                'outline-none focus:outline-none font-bold',
                style.forgot
              )}
            >
              Forgot password ?
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

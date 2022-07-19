import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';
import { TLoginProps } from '@/generated/Auth';
import { Modal } from '@mui/material';
import { Input } from './Input';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { loginSchema } from './Schema';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Error from './AuthError';

export const Login = ({ open, handleClose }: TLoginProps) => {
  const [error, setError] = React.useState<string>();

  const auth = getAuth();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        setError(undefined);
        console.log('signin', res.user);
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      }
    },
    validationSchema: loginSchema,
    validateOnChange: true,
  });

  const { values, errors, isSubmitting } = formik;

  const inputMarginTop = '28px';

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        className={classname(
          'relative flex items-center justify-center outline-none focus:outline-none h-screen'
        )}
      >
        <div className={classname('bg-white relative', style.login)}>
          <div className="absolute top-0" style={{ right: '53px' }}>
            <button
              type="button"
              className={classname(
                'outline-none focus:outline-none flex items-center mt-3'
              )}
              style={{ color: '#FF0000' }}
              onClick={handleClose}
            >
              <Icon icon="ion:close-circle" />
              <small className="ml-1 font-bold">Close</small>
            </button>
          </div>
          {error && <Error error={error} />}
          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Email"
              value={values.email}
              onChange={formik.handleChange}
              type="email"
              name="email"
              error={errors.email}
              marginTop={inputMarginTop}
            />
            <Input
              label="Password"
              value={values.password}
              onChange={formik.handleChange}
              type="password"
              name="password"
              error={errors.password}
              marginTop={inputMarginTop}
            />
            <button
              type="submit"
              className={classname(
                'outline-none focus:outline-none w-full',
                style.btn
              )}
              disabled={isSubmitting}
              style={
                isSubmitting
                  ? { cursor: 'not-allowed', opacity: 0.5 }
                  : { cursor: 'pointer', opacity: 1 }
              }
            >
              Login
            </button>
            <div className="flex justify-between">
              <button
                type="button"
                className={classname(
                  'outline-none focus:outline-none font-bold',
                  style.forgot
                )}
              >
                Forgot password ?
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

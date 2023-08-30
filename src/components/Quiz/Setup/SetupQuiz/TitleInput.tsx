import React from 'react';
import classname from 'classnames';
import { FormikProps } from 'formik';
import InputError from '../InputError';

const TitleInput = ({
  formik,
  error,
}: {
  formik: FormikProps<any>;
  error?: string;
}) => {
  const { values } = formik;

  return (
    <div>
      <input
        type="text"
        className={classname(
          'outline-none focus:outline-none text-14 font-bold text-black'
        )}
        placeholder="Write name of your quiz"
        value={values.title}
        onChange={formik.handleChange}
        name="title"
      />
      <InputError error={error} />
    </div>
  );
};
export default TitleInput;

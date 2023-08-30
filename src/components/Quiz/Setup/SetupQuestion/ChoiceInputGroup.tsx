import React from 'react';
import style from './SetupQuestion.module.scss';
import classname from 'classnames';
import ChoiceInput from './ChoiceInput';
import { FormikProps } from 'formik';

const ChoiceInputGroup = ({
  formik,
  error,
  value,
}: {
  formik: FormikProps<any>;
  value: string;
  error?: string;
}) => {
  const onChange = (value: string) => {
    const choices = [];

    const selectedValue = Number(value);

    for (let i = 0; i < selectedValue; i++) {
      choices.push('');
    }

    formik.setFieldValue('choiceNumber', value, false);
    formik.setFieldValue('choices', choices, false);
  };
  return (
    <div className={classname(style.inputGroup)}>
      <div className="flex items-center">
        <span className={classname('text-14')}>
          How many choices would you like to be available ?{' '}
        </span>
        <span className={classname('font-bold text-14 text-red-500 ml-2')}>
          (Maximum 5 & Minimum 2)
        </span>
      </div>
      <ChoiceInput onChange={onChange} value={value} error={error} />
    </div>
  );
};
export default ChoiceInputGroup;

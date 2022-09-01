import React from 'react';
import style from './SetupQuestion.module.scss';
import classname from 'classnames';
import { FormikProps, FieldArray } from 'formik';

export const ChoiceOption = ({}: { formik: FormikProps<any> }) => {
  return (
    <FieldArray
      name="choices"
      render={() => {
        return (
          <div className={classname(style.choiceOption, 'relative')}></div>
        );
      }}
    />
  );
};
export default ChoiceOption;

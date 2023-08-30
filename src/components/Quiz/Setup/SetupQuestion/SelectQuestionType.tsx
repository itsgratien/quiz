import React from 'react';
import classname from 'classnames';
import style from './SetupQuestion.module.scss';
import { FormikProps } from 'formik';
import ChoiceType from './ChoiceType';
import InputError from '@/components/Quiz/InputError';
import { ChoiceTypeEnum } from '@/generated/Enum';

const SelectQuestionType = ({ formik }: { formik: FormikProps<any> }) => {
  const { values } = formik;

  const onChangeChoiceType = (formik: FormikProps<any>, value: string) => {
    formik.setFieldValue('choiceType', value, false);
  };

  return (
    <div className={classname(style.inputGroup)}>
      <div className={classname('flex items-center')}>
        <ChoiceType
          label={ChoiceTypeEnum.MultipleChoice}
          value={values.choiceType}
          onChange={(value) => onChangeChoiceType(formik, value)}
        />
        <ChoiceType
          label={ChoiceTypeEnum.SingleChoice}
          value={values.choiceType}
          onChange={(value) => onChangeChoiceType(formik, value)}
        />
      </div>
      <InputError error={errors.choiceType} />
    </div>
  );
};

export default SelectQuestionType;

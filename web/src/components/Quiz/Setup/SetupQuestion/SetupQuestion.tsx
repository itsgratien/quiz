import React from 'react';
import classname from 'classnames';
import style from './SetupQuestion.module.scss';
import Modal from '../ModalContainer';
import Button from '../Button';
import SectionTitle from '../../SectionTitle';
import { InputField } from '../InputField';
import ChoiceType from './ChoiceType';
import { Formik, FormikProps, FieldArray } from 'formik';
import { SetupQuestionSchema } from './Schema';
import { ChoiceTypeEnum } from '@/generated/Enum';
import InputError from '../InputError';
import ChoiceInputGroup from './ChoiceInputGroup';

export const SetupQuestion = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose?: () => void;
}) => {
  const onChangeChoiceType = (formik: FormikProps<any>, value: string) => {
    formik.setFieldValue('choiceType', value, false);
  };

  return (
    <Formik
      initialValues={{
        title: '',
        points: '',
        choiceType: '',
        choices: [],
        description: '',
        choiceNumber: '',
      }}
      validationSchema={SetupQuestionSchema}
      validateOnChange={false}
      onSubmit={(values) => values}
    >
      {(formik) => {
        const { values, errors } = formik;
        return (
          <Modal
            open={open}
            handleClose={handleClose}
            nextButton={
              <Button
                name="Save & Close"
                className="primary"
                handleClick={formik.handleSubmit}
              />
            }
            leftElement={
              <div>
                <span className="font-bold text-14 tex-black">
                  Setup Question
                </span>
              </div>
            }
          >
            <div
              className={classname(
                'relative',
                style.setup,
                style.setupQuestion
              )}
            >
              <div className={classname(style.qTitle)}>
                <input
                  type="text"
                  placeholder="Title of your question"
                  className={classname(
                    'rounded-10 bg-f1 outline-none focus:outline-none'
                  )}
                />
              </div>
              <div style={{ paddingLeft: '30px' }}>
                <div className={style.inputGroup}>
                  <SectionTitle title="Points" iconName="mdi:air-humidifier" />
                  <InputField
                    name="points"
                    value={values.points}
                    onChange={formik.handleChange}
                    placeholder="Points"
                    width="280px"
                    error={errors.points}
                    type="number"
                  />
                </div>
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
                <ChoiceInputGroup
                  formik={formik}
                  value={values.choiceNumber}
                  error={errors.choiceNumber}
                />
              </div>
            </div>
          </Modal>
        );
      }}
    </Formik>
  );
};
export default SetupQuestion;

import React from 'react';
import classname from 'classnames';
import style from './SetupQuestion.module.scss';
import Modal from '../ModalContainer';
import Button from '../Button';
import SectionTitle from '../../SectionTitle';
import { InputField } from '../InputField';
import ChoiceType from './ChoiceType';
import { Formik, FormikProps } from 'formik';
import { SetupQuestionSchema } from './Schema';
import InputError from '../InputError';
import ChoiceInputGroup from './ChoiceInputGroup';
import ChoiceOption from './ChoiceOption';
import DescriptionField from './DescriptionField';
import { useSetupMcQuestionMutation } from '@/generated/graphql';
import LeftTitle from '@/components/Quiz/Setup/LeftTitle';

export const SetupQuestion = ({
  open,
  handleClose,
  testId,
}: {
  open: boolean;
  handleClose?: (load?: boolean) => void;
  testId?: string;
}) => {
  const [registerQuestion, { data, loading }] = useSetupMcQuestionMutation();

  React.useEffect(() => {
    if (
      data &&
      data.setupMultipleChoiceQuestion &&
      data.setupMultipleChoiceQuestion.message
    ) {
      handleClose(true);
    }
  }, [data, handleClose]);
  console.log('data', data);

  return (
    <Formik
      initialValues={{
        title: '',
        points: '',
        choiceType: '',
        choices: ['', ''],
        description: '',
        choiceNumber: '2',
        answers: [],
      }}
      validationSchema={SetupQuestionSchema}
      validateOnChange={false}
      onSubmit={async (values, _actions) => {
        await registerQuestion({
          variables: {
            ...values,
            testId,
            assignToTest: testId ? true : false,
            solutions: values.answers,
            points: Number(values.points),
          },
        });
      }}
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
                type="submit"
                disabled={loading}
              />
            }
            leftElement={<LeftTitle title="Setup Question" />}
          >
            <div
              className={classname(
                'relative',
                style.setup,
                style.setupQuestion
              )}
            >
              <div style={{ margin: 'auto', width: '50%' }}>
                <div className={classname(style.qTitle)}>
                  <input
                    type="text"
                    placeholder="Title of your question"
                    className={classname(
                      'rounded-10 bg-f1 outline-none focus:outline-none'
                    )}
                    value={values.title}
                    onChange={formik.handleChange}
                    name="title"
                  />
                  <InputError error={errors.title} />
                </div>
                <div style={{ paddingLeft: '30px' }}>
                  <div className={style.inputGroup}>
                    <SectionTitle
                      title="Points"
                      iconName="mdi:air-humidifier"
                    />
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
                  <ChoiceInputGroup
                    formik={formik}
                    value={values.choiceNumber}
                    error={errors.choiceNumber}
                  />
                </div>
              </div>
              <ChoiceOption
                formik={formik}
                choices={values.choices}
                errors={errors}
              />
              <div className="mx-auto" style={{ width: '50%' }}>
                <DescriptionField
                  onChange={formik.handleChange}
                  value={values.description}
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

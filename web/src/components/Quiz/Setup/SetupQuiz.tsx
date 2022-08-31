import * as React from 'react';
import classname from 'classnames';
import style from './Setup.module.scss';
import Modal from './ModalContainer';
import Button from './Button';
import SectionTitle from '../SectionTitle';
import DateInput from './DateInput';
import { SetupQuizSchema } from './Schema';
import { useFormik } from 'formik';
import InputError from './InputError';
import ViewAssignedQuestion from './ViewAssignedQuestion';

const SetupQuiz = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose?: () => void;
}) => {
  const [viewQ, setViewQ] = React.useState<boolean>(false);

  const formik = useFormik({
    validationSchema: SetupQuizSchema,
    initialValues: { name: '', startDate: '', endDate: '', subject: '' },
    onSubmit: (values) => {
      setViewQ(true);
    },
    validateOnChange: true,
  });

  const { values, errors } = formik;

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      nextButton={
        <Button
          name="Save & Continue"
          className="primary"
          type="submit"
          handleClick={formik.handleSubmit}
        />
      }
      leftElement={
        <div>
          <input
            type="text"
            className={classname(
              'outline-none focus:outline-none text-14 font-bold text-black'
            )}
            placeholder="Write name of your quiz"
            value={values.name}
            onChange={formik.handleChange}
            name="name"
          />
          <InputError error={errors?.name} />
        </div>
      }
    >
      <div
        className={classname(
          'relative flex flex-col items-center',
          style.setup,
          style.setupQuiz
        )}
      >
        {viewQ && (
          <ViewAssignedQuestion
            open={viewQ}
            handleClose={() => setViewQ(false)}
          />
        )}
        <div>
          <div className={classname('relative')}>
            <SectionTitle
              title="start date & end date"
              iconName="clarity:date-outline-badged"
              textSize={12}
            />
            <div
              className={classname('flex items-center')}
              style={{ marginTop: '12px' }}
            >
              <div className={classname(style.inputGroup)}>
                <DateInput
                  onChange={(value) =>
                    formik.setFieldValue('startDate', value, false)
                  }
                  value={values.startDate}
                />
                <InputError error={errors?.startDate} />
              </div>
              <div style={{ margin: '0 20px' }}>-</div>
              <div className={classname(style.inputGroup)}>
                <DateInput
                  onChange={(value) =>
                    formik.setFieldValue('endDate', value, false)
                  }
                  value={values.endDate}
                />
                <InputError error={errors?.endDate} />
              </div>
            </div>
          </div>
          <div className={classname('mt-10')}>
            <SectionTitle
              title="subject"
              iconName="mdi:air-humidifier"
              textSize={12}
            />
            <div className={style.inputGroup} style={{ marginTop: '12px' }}>
              <input
                type="text"
                placeholder="subject"
                className={classname(
                  'outline-none focus:outline-none bg-f1 w-full rounded-10 h-full text-14',
                  style.subjectInput
                )}
                value={values.subject}
                name="subject"
                onChange={formik.handleChange}
              />
              <InputError error={errors?.subject} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SetupQuiz;

import * as React from 'react';
import classname from 'classnames';
import style from './Setup.module.scss';
import Modal from './ModalContainer';
import Button from './Button';
import SectionTitle from '../SectionTitle';
import DateInput from './DateInput';
import { SetupQuizSchema } from './Schema';
import { useFormik } from 'formik';

const SetupQuiz = () => {
  const formik = useFormik({
    validationSchema: SetupQuizSchema,
    initialValues: { name: '', startDate: '', endDate: '', subject: '' },
    onSubmit: ()=> {},
    validateOnChange: false
  });
  
  return (
    <form autoComplete="off" className="outline-none focus:outline-none" onSubmit={formik.handleSubmit}>
      <Modal
        open={true}
        nextButton={
          <Button name="Save & Continue" className="primary" type="submit" />
        }
        leftElement={
          <div>
            <input
              type="text"
              className={classname('outline-none focus:outline-none text-14')}
              placeholder="Write name of your quiz"
            />
          </div>
        }
      >
        <div
          className={classname(
            'relative flex flex-col items-center',
            style.setupQuiz
          )}
        >
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
                  <DateInput />
                </div>
                <div style={{ margin: '0 20px' }}>-</div>
                <div className={classname(style.inputGroup)}>
                  <DateInput />
                </div>
              </div>
            </div>
            <div className={classname('mt-5')}>
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
                  value=""
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export default SetupQuiz;

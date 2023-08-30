import React from 'react';
import classname from 'classnames';
import style from '../Setup.module.scss';
import SectionTitle from '@/components/Quiz/SectionTitle';
import DateInput from '../DateInput';
import InputError from '../InputError';
import { FormikProps, FormikErrors } from 'formik';
import InputField from '../InputField';
import useSetup from '@/hooks/useSetup';

interface Values {
  startDate?: string;
  endDate?: string;
  subject?: string;
  passMark?: number;
}

const Form = ({
  formik,
  errors,
}: {
  formik: FormikProps<any>;
  errors?: FormikErrors<Values>;
}) => {
  const { values } = formik;

  return (
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
      <div className={classname('mt-10 flex items-center')}>
        <div className={classname('')}>
          <SectionTitle
            title="subject"
            iconName="mdi:air-humidifier"
            textSize={12}
          />
          <div className={style.inputGroup} style={{ marginTop: '12px' }}>
            <InputField
              placeholder="subject"
              value={values.subject}
              onChange={formik.handleChange}
              name="subject"
              error={errors?.subject}
            />
          </div>
        </div>
        <div className={classname('ml-10')}>
          <SectionTitle
            title="pass mark (%100)"
            iconName="ant-design:percentage-outlined"
            textSize={12}
          />
          <div className={style.inputGroup} style={{ marginTop: '12px' }}>
            <InputField
              placeholder="pass mark"
              value={values.passMark}
              onChange={formik.handleChange}
              name="passMark"
              error={errors?.passMark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;

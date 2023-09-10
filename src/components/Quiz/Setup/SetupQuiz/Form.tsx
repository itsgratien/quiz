import React from 'react';
import { FormikProps, FormikErrors } from 'formik';
import { TextInput, DateRangeInput } from '../Form';
import { Row, Col } from 'antd';
import { gutter } from '@/utils/Common';

interface Values {
  startDate: string;
  endDate: string;
  subject: string;
  passMark: string;
  title: string;
}

const Form = ({
  formik,
  errors,
  values,
}: {
  formik: FormikProps<any>;
  errors?: FormikErrors<Values>;
  values: Values;
}) => {
  const { setFieldValue } = formik;

  const onChangeDate = (args: string[]) => {
    setFieldValue('startDate', args[0]);
    setFieldValue('endDate', args[1]);
  };

  return (
    <>
      <Row gutter={gutter}>
        <Col md={12}>
          <TextInput
            value={values.title}
            placeholder="Title"
            label={{ name: 'Title' }}
            name="title"
            onChange={formik.handleChange}
            type="text"
          />
        </Col>
        <Col md={12}>
          <DateRangeInput
            label={{ name: 'Start date & End date', required: true }}
            values={[values.startDate, values.endDate]}
            onChange={onChangeDate}
          />
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col md={12}>
          <TextInput
            value={values.subject}
            placeholder="Subject"
            label={{ name: 'Subject' }}
            name="subject"
            onChange={formik.handleChange}
            type="text"
          />
        </Col>
        <Col md={12}>
          <TextInput
            placeholder="pass mark"
            value={values.passMark}
            onChange={formik.handleChange}
            name="passMark"
            error={errors?.passMark}
            label={{ name: 'Pass Mark' }}
            type="text"
          />
        </Col>
      </Row>
    </>
  );
};
export default Form;

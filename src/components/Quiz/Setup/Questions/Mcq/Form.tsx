import React from 'react';
import { FormikErrors, FormikProps, FormikTouched } from 'formik';
import type { AddMcqValues } from '@/generated/Quiz';
import { TextInput, NumberInput, TextArea } from '../../Form';
import { Row, Col } from 'antd';
import { gutter } from '@/utils/Common';
import Buttons from '../../Buttons';

interface McqFormProps {
  formik: FormikProps<any>;
  values: AddMcqValues;
  errors?: FormikErrors<AddMcqValues>;
  touched?: FormikTouched<AddMcqValues>;
}

export const McqForm = ({ formik, values, errors, touched }: McqFormProps) => {
  return (
    <>
      <Row gutter={gutter}>
        <Col md={12}>
          <TextInput
            value={values.title}
            onChange={formik.handleChange}
            name="title"
            placeholder="Enter title"
            label={{ required: true, name: 'Title' }}
            type="text"
            error={errors?.title && touched?.title ? errors.title : undefined}
          />
        </Col>
        <Col md={12}>
          <NumberInput
            value={values.points}
            onChange={(val) => formik.setFieldValue('points', val ?? '')}
            name="points"
            placeholder="Enter Points"
            label={{ required: true, name: 'Points' }}
            error={
              errors?.points && touched?.points ? errors.points : undefined
            }
          />
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col md={24}>
          <TextArea
            name="description"
            onChange={formik.handleChange}
            error={errors?.description}
            label={{ name: 'Description', required: false }}
            value={values.description}
          />
        </Col>
      </Row>
      <Buttons />
    </>
  );
};
export default McqForm;

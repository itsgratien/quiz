import React from 'react';
import { useFormik } from 'formik';
import { AddMcqValues } from '@/generated/Quiz';
import { useAddMcq } from '@/hooks/useSetup';
import { Buttons } from '../../Buttons';
import { SelectInput, Label } from '../../Form';
import type { SelectProps } from 'antd';
import ChoiceItems from './ChoiceItems';

export const Choice = () => {
  const {} = useAddMcq();

  const formik = useFormik<
    Pick<AddMcqValues, 'answers' | 'choices'> & {
      options?: SelectProps['options'];
      activeOption: number;
    }
  >({
    initialValues: {
      answers: [],
      choices: [],
      options: [],
      activeOption: 3,
    },
    onSubmit: (values) => {},
  });

  const { values, setFieldValue } = formik;

  React.useEffect(() => {
    const items: SelectProps['options'] = [];
    for (let i = 3; i <= 5; i++) {
      items.push({ label: i.toString(), value: i.toString() });
    }
    setFieldValue('options', items);
  }, [setFieldValue]);

  return (
    <>
      <SelectInput
        options={values.options}
        value={values?.activeOption.toString() ?? ''}
        placeholder="Select choices"
        label={{
          name: 'How many choices would you like to be available?',
          required: true,
        }}
        onChange={(value) => setFieldValue('activeOption', value)}
      />
      <div>
        <Label name="Choices" required />
        <ChoiceItems numberOfChoice={values.activeOption} formik={formik} />
      </div>
      <Buttons />
    </>
  );
};
export default Choice;

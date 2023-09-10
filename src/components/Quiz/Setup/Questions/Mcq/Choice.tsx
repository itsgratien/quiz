import React from 'react';
import { useFormik } from 'formik';
import { AddMcqValues } from '@/generated/Quiz';
import { useAddMcq } from '@/hooks/useSetup';
import { Buttons } from '../../Buttons';
import { SelectInput, Label } from '../../Form';
import type { SelectProps } from 'antd';
import { Row, Col } from 'antd';
import cn from 'classnames';
import { gutter } from '@/utils/Common';

export const Choice = () => {
  const [options, setOptions] = React.useState<SelectProps['options']>([]);

  const {} = useAddMcq();

  const formik = useFormik<Pick<AddMcqValues, 'answers' | 'choices'>>({
    initialValues: {
      answers: [],
      choices: [],
    },
    onSubmit: (values) => {},
  });

  React.useEffect(() => {
    const items: SelectProps['options'] = [];
    for (let i = 3; i <= 5; i++) {
      items.push({ label: i.toString(), value: i.toString() });
    }
    setOptions(items);
  }, []);

  return (
    <>
      <SelectInput
        options={options}
        value=""
        placeholder="Select choices"
        label={{
          name: 'How many choices would you like to be available?',
          required: true,
        }}
        onChange={() => {}}
      />
      <div>
        <Label name="Choices" required />
        <Row gutter={gutter}>
          <Col md={8}></Col>
        </Row>
      </div>
      <Buttons />
    </>
  );
};
export default Choice;

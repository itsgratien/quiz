import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import cn from 'classnames';
import { gutter } from '@/utils/Common';
import { TextArea } from '../../Form';
import { isEmpty } from 'lodash';
import { FormikProps } from 'formik';

interface ChoiceItemsProps {
  numberOfChoice: number;
  formik: FormikProps<any>;
}

interface Choices {
  key: string;
  value: string;
  selected: boolean;
}

export const ChoiceItems = ({ numberOfChoice, formik }: ChoiceItemsProps) => {
  const [choices, setChoices] = React.useState<Choices[]>([]);

  const [changed, setChanged] = React.useState<boolean>(false);

  const { setFieldValue } = formik;

  React.useEffect(() => {
    const items: Choices[] = [];
    for (let i = 0; i < numberOfChoice; i++) {
      items.push({ key: (i + 1).toString(), value: '', selected: false });
    }
    setChoices(items);
  }, [numberOfChoice]);

  const onChange = (value: string, item: Choices) => {
    setChanged(true);
    const up = choices.map((it) => {
      if (it.key === item.key) {
        it.value = value;
      }

      return it;
    });

    setChoices(up);
  };

  const onChangeCheckBox = (value: boolean, item: Choices) => {
    setChanged(true);
    const up = choices.map((it) => {
      if (it.key === item.key && !isEmpty(item.value)) {
        it.selected = value;
      }

      return it;
    });

    setChoices(up);
  };

  React.useEffect(() => {
    if (changed) {
      const f = choices.filter((item) => !isEmpty(item.value));
      setFieldValue(
        'choices',
        f.map((item) => item.value),
      );

      const s = f.filter((item) => item.selected);

      setFieldValue(
        'answers',
        s.map((item) => item.value),
      );

      setChanged(() => false);
    }
  }, [changed, choices, setFieldValue]);

  return (
    <Row gutter={gutter}>
      {choices?.map((item) => (
        <Col md={24} key={item.key}>
          <div className={cn('flex items-center justify-between')}>
            <TextArea
              value={item.value}
              onChange={(e) => onChange(e.target.value, item)}
              placeholder="Enter choice"
              name="choice"
              textAreaStyles={{ height: '45px' }}
            />
            <Checkbox
              className={cn('ml-2')}
              checked={item.selected}
              onChange={(e) => onChangeCheckBox(e.target.checked, item)}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default ChoiceItems;

import React from 'react';
import classname from 'classnames';
import style from './SetupQuestion.module.scss';
import SectionTitle from '../../SectionTitle';

export const DescriptionField = ({
  onChange,
  value,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className={style.inputGroup}>
      <SectionTitle title="Description" iconName="ic:outline-description" />
      <textarea
        value={value}
        onChange={onChange}
        name="description"
        className={classname(
          'outline-none focus:outline-none bg-f1 mt-14 rounded-5 mb-10'
        )}
        style={{ width: '623px', height: '150px', padding: '32px' }}
        placeholder="write your description"
      ></textarea>
    </div>
  );
};

export default DescriptionField;

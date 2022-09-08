import React from 'react';
import classname from 'classnames';
import style from './QuestionDetail.module.scss';
import SectionTitle from '@/components/Quiz/SectionTitle';
import QuestionMock from '@/mocks/Question';

const Description = () => {
  return (
    <div className={classname('w-full', style.description)}>
      <SectionTitle
        title="Description"
        iconName="academicons:open-data"
        iconColor="#001AFF"
      />
      <div
        className={classname(
          'text-14 mt-3 bg-f1 rounded-10',
          style.descriptionTextArea
        )}
      >
        {QuestionMock.getAll[0].description}
      </div>
    </div>
  );
};
export default Description;

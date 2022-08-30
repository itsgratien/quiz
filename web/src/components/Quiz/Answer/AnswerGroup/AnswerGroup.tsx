import * as React from 'react';
import style from './AnswerGroup.module.scss';
import classname from 'classnames';
import QType from '@/components/Quiz/QuestionItem/QType';
import Answer from '@/mocks/Answer';
import SectionTitle from '../../SectionTitle';
import AnswerItem from './AnswerItem';

const AnswerGroup = () => {
  return (
    <div className={classname('relative bg-f1', style.answerGroup)}>
      <div style={{ width: '150px', marginLeft: '18px' }}>
        <QType name="Multiple Choice" />
      </div>
      <div
        className={classname('absolute top-0 right-0')}
        style={{ marginTop: '39px', marginRight: '66px' }}
      >
        <span className={classname('font-bold text-12 text-black')}>
          {Answer.getAll[0].grade} out of {Answer.getAll[0].question.points}{' '}
          points
        </span>
      </div>
      <div className={classname('text-14 font-bold text-black mt-5')}>
        Explain where React JS can be used for ?
      </div>
      <div className={classname('relative', style.description)}>
        <SectionTitle
          title="Description"
          iconName="academicons:open-data"
          iconColor="#001AFF"
          titleColor="fewBlack"
        />
        <div className={classname('text-14 mt-3')}>
          {Answer.getAll[0].question.description}
        </div>
      </div>
      <div className={classname('relative', style.answers)}>
        <SectionTitle
          title="Answers"
          iconName="academicons:open-data"
          iconColor="#001AFF"
          titleColor="fewBlack"
        />
        <div className={classname('relative mt-5', style.answerItems)}>
          {Answer.getAll[0].question.choices.map((item) => (
            <AnswerItem key={item} value={item} success />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerGroup;

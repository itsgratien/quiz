import * as React from 'react';
import style from './AnswerGroup.module.scss';
import classname from 'classnames';
import QType from '@/components/Quiz/QuestionItem/QType';
import Answer from '@/mocks/Answer';
import SectionTitle from '../../SectionTitle';
import AnswerItem from './AnswerItem';

const AnswerGroup = ({ item }: { item: typeof Answer.getAll[0] }) => {
  const makeFirstUppercaseFunc = (value: string) => {
    const getFirstChar = value.slice(0, 1).toUpperCase();

    const remainedChar = value.slice(1);

    return `${getFirstChar}${remainedChar}`;
  };

  return (
    <div className={classname('relative bg-f1', style.answerGroup)}>
      <div style={{ width: '150px', marginLeft: '18px' }}>
        <QType name={item.question.type} />
      </div>
      <div
        className={classname('absolute top-0 right-0')}
        style={{ marginTop: '39px', marginRight: '66px' }}
      >
        <span className={classname('font-bold text-12 text-black')}>
          {item.grade} out of {item.question.points} points
        </span>
      </div>
      <div className={classname('text-14 font-bold text-black mt-5')}>
        {makeFirstUppercaseFunc(item.question.title)}
      </div>
      <div className={classname('relative', style.description)}>
        <SectionTitle
          title="Description"
          iconName="academicons:open-data"
          iconColor="#001AFF"
          titleColor="fewBlack"
        />
        <div className={classname('text-14 mt-3')}>
          {item.question.description}
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
          {item.question.choices.map((choice) => (
            <AnswerItem
              key={choice}
              value={choice}
              solutions={item.question.answers}
              answers={item.answers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerGroup;

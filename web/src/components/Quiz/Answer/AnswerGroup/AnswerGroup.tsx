import * as React from 'react';
import style from './AnswerGroup.module.scss';
import classname from 'classnames';
import QType from '@/components/Quiz/QuestionItem/QType';
import SectionTitle from '../../SectionTitle';
import AnswerItem from './AnswerItem';
import { Question } from '@/generated/graphql';
import useGetAnswer from '@/hooks/useGetAnswer';

const AnswerGroup = ({ item, testId }: { item: Question; testId?: string }) => {
  const makeFirstUppercaseFunc = (value: string) => {
    const getFirstChar = value.slice(0, 1).toUpperCase();

    const remainedChar = value.slice(1);

    return `${getFirstChar}${remainedChar}`;
  };

  return (
    <div className={classname('relative bg-f1', style.answerGroup)}>
      <div style={{ width: '150px', marginLeft: '18px' }}>
        <QType name={String(item.type)} />
      </div>
      <div
        className={classname('absolute top-0 right-0')}
        style={{ marginTop: '39px', marginRight: '66px' }}
      >
        <span className={classname('font-bold text-12 text-black')}>
          0 out of {item.points} points
        </span>
      </div>
      <div className={classname('text-14 font-bold text-black mt-5')}>
        {makeFirstUppercaseFunc(item.title)}
      </div>
      {item.description && (
        <div className={classname('relative', style.description)}>
          <SectionTitle
            title="Description"
            iconName="academicons:open-data"
            iconColor="#001AFF"
            titleColor="fewBlack"
          />
          <div className={classname('text-14 mt-3')}>{item.description}</div>
        </div>
      )}
      <div className={classname('relative', style.answers)}>
        <SectionTitle
          title="Answers"
          iconName="academicons:open-data"
          iconColor="#001AFF"
          titleColor="fewBlack"
        />
        <div className={classname('relative mt-5', style.answerItems)}>
          {item.choices &&
            item.solutions &&
            item.choices.map((choice) => (
              <AnswerItem
                key={choice}
                value={choice}
                solutions={item.solutions as string[]}
                answers={[]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerGroup;

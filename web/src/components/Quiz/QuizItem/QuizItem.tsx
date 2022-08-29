import React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';
import { Icon } from '@iconify/react';
import StatItem from './StatItem';
import Status from './Status';
import ViewMoreButton from './ViewMoreButton';
import { QuizItemProps } from '@/generated/Quiz';
import Svg from './Svg';
import QuizDate from './QuizDate';

export const QuizItem = ({ item: { name, status, _id } }: QuizItemProps) => {
  const [more, setMore] = React.useState<boolean>(false);

  const [qId, setQId] = React.useState<string>();

  return (
    <div
      className={classname('relative', style.qItem)}
      onMouseOver={() => setMore(true)}
      onMouseLeave={() => setMore(false)}
    >
      <Svg more={more} />
      <div className={classname('z-10 relative', style.container)}>
        <div className={classname(style.title, 'text-20 capitalize')}>
          {name}
        </div>
        <div className={style.details}>
          <Status status={status} />
          <QuizDate
            label="Start date and end date"
            value={
              <>
                {new Date().toDateString()}&nbsp; to &nbsp;
                {new Date().toDateString()}
              </>
            }
          />
          <div
            className={classname('relative flex items-center', style.statistic)}
          >
            <StatItem title="Questions assigned to this quiz" number={50} />
            <StatItem title=" Attendants were invited" number={50} />
          </div>
          <div className={classname('absolute', style.viewMore)}>
            <ViewMoreButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;

import React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';
import { Icon } from '@iconify/react';
import StatItem from './StatItem';
import Status from './Status';
import ViewMoreButton from './ViewMoreButton';
import { QuizItemProps } from '@/generated/Quiz';

export const QuizItem = ({
  item: { name, status },
  handleViewMore,
}: QuizItemProps) => {
  return (
    <div className={classname('relative', style.qItem)}>
      <svg
        width="581"
        height="425"
        viewBox="0 0 581 425"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 20C0 8.95431 8.9543 0 20 0H561C572.046 0 581 8.9543 581 20V378.457C581 389.122 572.632 397.91 561.98 398.433L20.9799 424.971C9.5631 425.531 0 416.425 0 404.995V20Z"
          fill="#F1F1F1"
        />
      </svg>
      <div className={classname('z-10 relative', style.container)}>
        <div className={classname(style.title, 'text-20')}>{name}</div>
        <div className={style.details}>
          <Status status={status} />
          <div className={style.date}>
            <div
              className={classname('relative flex items-center', style.label)}
            >
              <Icon
                icon="clarity:date-outline-badged"
                fontSize={25}
                className={style.icon}
                width={25}
              />
              <span className="font-bold">Start date and end date</span>
            </div>
            <div className={style.text}>
              {new Date().toDateString()}&nbsp; to &nbsp;
              {new Date().toDateString()}
            </div>
          </div>
          <div
            className={classname('relative flex items-center', style.statistic)}
          >
            <StatItem title="Questions assigned to this quiz" number={50} />
            <StatItem title=" Attendants were invited" number={50} />
          </div>
          {handleViewMore && (
            <div className={classname('absolute', style.viewMore)}>
              <ViewMoreButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizItem;

import React from 'react';
import style from './Style.module.scss';
import classname from 'classnames';
import { QuestionItemPropsT } from '@/generated/Quiz';
import Checkbox from '@mui/material/Checkbox';

export const QuestionItem = ({ item }: QuestionItemPropsT) => {
  return (
    <div className={classname('relative w-full', style.questionItem)}>
      <div className={classname('flex items-center', style.qHeading)}>
        <div className={classname('font-bold', style.title)}>{item.title}</div>
      </div>
      {item.choices && (
        <div className={classname('relative', style.choices)}>
          <ul>
            {item.choices.map((choice) => (
              <li
                className={classname('flex items-center', style.li)}
                key={choice}
              >
                <Checkbox />
                <span>{choice}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={classname(style.time, 'flex items-center justify-center mt-2')}>
        <span className='font-bold'>{item.time} minutes</span>
      </div>
    </div>
  );
};

export default QuestionItem;

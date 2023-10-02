import React from 'react';
import Svg from '../Start/Svg';
import classname from 'classnames';
import style from './Completed.module.scss';
import Header from '../Start/Header';
import { Icon } from '@iconify/react';

export const Completed = () => {
  return (
    <div className={classname('relative w-full', style.startQuiz)}>
      <Svg />
      <div className={classname('absolute top-0 left-0 right-0', style.main)}>
        <Header showStartBtn={false} />
        <div
          className={classname(
            style.completed,
            'relative flex items-center justify-center',
          )}
        >
          <div
            className={classname(
              style.completedContainer,
              ' bg-white m-auto flex flex-col justify-center items-center',
            )}
          >
            <div>
              <Icon
                icon={'simple-line-icons:check'}
                fontSize={100}
                color="#00B76A"
              />
            </div>
            <div
              className={classname('text-14 mt-5 text-center font-bold')}
              style={{ color: 'rgba(0, 0, 0, 0.5)', width: '280px' }}
            >
              Congratulations, You have completed the assessment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Completed;

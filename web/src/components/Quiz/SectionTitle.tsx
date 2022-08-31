import * as React from 'react';
import classname from 'classnames';
import style from './Quiz.module.scss';
import { Icon } from '@iconify/react';

export const SectionTitle = ({
  title,
  total,
  iconName,
  iconColor,
  titleColor,
  textSize,
  totalMarginLeft,
  totalColor,
}: {
  title: string;
  total?: string;
  iconName?: string;
  iconColor?: string;
  titleColor?: 'black' | 'fewBlack';
  textSize?: number;
  totalMarginLeft?: string;
  totalColor: 'black' | 'fewBlack';
}) => {
  return (
    <div className={classname(style.sectionTitle, 'flex flex-col')}>
      <div className="flex items-center">
        {iconName && <Icon icon={iconName} fontSize={26} color={iconColor} />}
        <span
          className={classname(
            `font-bold text-${textSize || 15} capitalize`,
            iconName && 'ml-2'
          )}
          style={{
            color: titleColor === 'fewBlack' ? 'rgba(0, 0, 0, 0.5)' : 'black',
          }}
        >
          {title}
        </span>
      </div>
      {total && (
        <span
          className={classname('text-12', `ml-${totalMarginLeft || 3}`)}
          style={{
            color: totalColor === 'fewBlack' ? 'rgba(0, 0, 0, 0.5)' : 'black',
          }}
        >
          {total}
        </span>
      )}
    </div>
  );
};

export default SectionTitle;

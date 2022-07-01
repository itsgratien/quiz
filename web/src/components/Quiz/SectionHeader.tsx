import React from 'react';
import classname from 'classnames';
import style from './Style.module.scss';
import { SectionHeaderPropsT } from '@/generated/Quiz';

export const SectionHeader = ({ title }: SectionHeaderPropsT) => {
  return (
    <div className={classname('flex items-center', style.sectionHeader)}>
      <div className={classname('font-bold capitalize', style.title)}>
        {title}
      </div>
    </div>
  );
};

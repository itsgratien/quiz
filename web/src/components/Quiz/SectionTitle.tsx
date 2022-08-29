import * as React from 'react';
import classname from 'classnames';
import style from './Quiz.module.scss';

export const SectionTitle = ({
  title,
  total,
}: {
  title: string;
  total?: string;
}) => {
  return (
    <div className={classname(style.sectionTitle, 'flex flex-col')}>
      <span className="font-bold text-black text-15 capitalize">{title}</span>
      {total && (
        <span className="ml-3 text-12" style={{ color: 'rgba(0, 0, 0, 1);' }}>
          {total}
        </span>
      )}
    </div>
  );
};

export default SectionTitle;

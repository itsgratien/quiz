import * as React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';

const ViewMoreButton = ({ name }: { name?: string }) => {
  return (
    <button
      className={classname(
        'capitalize font-bold text-14 outline-none focus:outline-none rounded-10 bg-white',
        style.viewMoreBtn
      )}
      type="button"
    >
      {name || 'View more'}
    </button>
  );
};
export default ViewMoreButton;

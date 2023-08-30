import * as React from 'react';
import classname from 'classnames';
import style from './QuizItem.module.scss';

const ViewMoreButton = ({
  name,
  size,
  handleClick,
}: {
  name?: string;
  size?: 'large' | 'small';
  handleClick?: () => void;
}) => {
  return (
    <button
      className={classname(
        'capitalize font-bold outline-none focus:outline-none rounded-10 bg-white',
        style.viewMoreBtn,
        size === 'small' ? 'text-12' : 'text-14',
        size === 'small' && style.viewMoreBtnSmall
      )}
      type="button"
      onClick={handleClick}
    >
      {name || 'View more'}
    </button>
  );
};
export default ViewMoreButton;

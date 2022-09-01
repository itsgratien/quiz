import React from 'react';
import classname from 'classnames';
import LoadMoreButton from '@/components/Quiz/LoadMoreButton';

const AddNewButton = ({
  position,
  onClick,
}: {
  position?: 'relative' | 'fixed';
  onClick?: () => void;
}) => {
  return (
    <div
      className={classname(
        position === 'fixed' ? 'fixed bottom-10 right-10' : 'relative'
      )}
    >
      <LoadMoreButton name="Add New" align="center" handleClick={onClick} />
    </div>
  );
};

export default AddNewButton;

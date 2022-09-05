import React from 'react';

const LeftTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <span className="font-bold text-14 text-black capitalize">{title}</span>
    </div>
  );
};
export default LeftTitle;

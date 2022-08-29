import React from 'react';
import style from './Candidates.module.scss';
import classname from 'classnames';
import { useQuizStatusColor } from '@/hooks/UseQuizStatus';

const CandidateHeaderItem = ({
  number,
  status,
}: {
  number: number;
  status: string;
}) => {
  const bgColor = useQuizStatusColor({ status });

  return (
    <div className={classname('flex items-center', style.candidateHeaderItem)}>
      <div
        style={{
          width: '28px',
          height: '28px',
          backgroundColor: bgColor,
        }}
      ></div>
      <div
        className="font-bold text-14 capitalize ml-2"
        style={{ color: 'rgba(0, 0, 0, 0.56)' }}
      >
        {number} {status}
      </div>
    </div>
  );
};
export default CandidateHeaderItem;

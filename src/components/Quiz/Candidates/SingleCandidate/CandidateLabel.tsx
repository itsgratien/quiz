import * as React from 'react';
import { Icon } from '@iconify/react';
import style from './SingleCandidate.module.scss';
import classname from 'classnames';

export const CandidateLabel = ({
  label,
  iconName,
  value,
}: {
  label: string;
  iconName: string;
  value: string;
}) => {
  return (
    <div className={classname('relative', style.candidateLabel)}>
      <div className="uppercase text-12 text-black ml-10">{label}</div>
      <div className="flex items-center">
        <Icon icon={iconName} fontSize={30} />
        <span className="text-14 ml-2">{value}</span>
      </div>
    </div>
  );
};
export default CandidateLabel;

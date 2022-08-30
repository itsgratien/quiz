import * as React from 'react';
import classname from 'classnames';
import style from './Candidates.module.scss';
import { Icon } from '@iconify/react';
import Status from '../QuizItem/Status';
import ViewMoreButton from '../QuizItem/ViewMoreButton';
import ViewMore from '../ViewMore';

export const CandidateItem = ({
  handleViewAnswer,
  names,
  email,
  phoneNumber,
  status,
}: {
  handleViewAnswer?: (value: string) => void;
  names: string;
  phoneNumber: string;
  email: string;
  status: string;
}) => {
  return (
    <div className={classname(style.candidateItem, 'relative bg-f1 rounded-5')}>
      <div
        className={classname('capitalize font-bold text-black text-14')}
        style={{ marginLeft: '36px' }}
      >
        {names}
      </div>
      <div className={classname('flex items-center mt-1')}>
        <Icon icon="eva:email-outline" fontSize={20} />
        <span className={classname('text-12 ml-1')}>{email}</span>
      </div>
      <div className={classname('flex items-center mt-1')}>
        <Icon icon="bi:phone" fontSize={20} />
        <span className={classname('text-12 ml-1')}>{phoneNumber}</span>
      </div>
      <div style={{ marginTop: '19px' }}>
        <Status status={status} />
      </div>
      <ViewMore className={style.viewMore}>
        <ViewMoreButton name="View Answer" size="small" />
      </ViewMore>
    </div>
  );
};
export default CandidateItem;

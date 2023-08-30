import React from 'react';
import classname from 'classnames';
import style from './QuestionDetail.module.scss';
import QType from '@/components/Quiz/QuestionItem/QType';
import Status from '@/components/Quiz/QuizItem/Status';

const Heading = ({
  width,
  title,
  status,
}: {
  width?: string;
  title?: string;
  status?: string;
}) => {
  return (
    <div
      className={classname(style.heading, 'm-auto')}
      style={{ width: width || '30%' }}
    >
      <div style={{ width: '150px', marginLeft: '30px', marginBottom: '20px' }}>
        <QType name="Multiple Choice" />
      </div>
      <div className={classname('text-20')}>{title || ''}</div>
      <div className={classname('text-12 mt-2')} style={{ color: '#505050' }}>
        Created on 25 June 2020
      </div>
      {status && (
        <div style={{ marginTop: '25px' }}>
          <Status status={status} />
        </div>
      )}
    </div>
  );
};
export default Heading;

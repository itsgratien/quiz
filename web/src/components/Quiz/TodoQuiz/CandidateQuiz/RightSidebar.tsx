import React from 'react';
import style from './CandidateQuiz.module.scss';
import classname from 'classnames';
import { Attendant } from '@/generated/graphql';
import { Icon } from '@iconify/react';
import { instructions } from '@/utils/Static';

const RightSidebar = ({
  candidate,
}: {
  candidate: Attendant;
  questionId: string;
}) => {
  return (
    <div className={classname(style.rightSidebar)}>
      <div className={classname('flex justify-end')}>
        <div>
          <span className="font-bold text-14 capitalize">
            {candidate.names}
          </span>
          <div className="flex items-center" style={{ marginTop: '-5px' }}>
            <span style={{ fontSize: '12px' }}>{candidate.email}</span>
            <Icon
              icon="clarity:email-line"
              fontSize={30}
              style={{ marginLeft: '10px' }}
            />
          </div>
        </div>
      </div>
      <div className={classname(style.qDetail)}>
        <div className={classname('flex flex-col', style.qHeading)}>
          <span className="text-12" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            question
          </span>
          <span
            className={classname('font-bold text-black mt-2')}
            style={{ fontSize: '18px' }}
          >
            What caused UI to crash
          </span>
        </div>
        <div className={classname(style.choices, 'relative')}>
          <ul>
            {instructions.map((item, itemKey) => (
              <li
                className={classname(
                  'relative flex',
                  item.length <= 70 ? 'items-center' : 'items-start'
                )}
                key={itemKey}
              >
                <button
                  type="button"
                  className={classname(
                    'outline-none focus:outline-none',
                    style.btn
                  )}
                ></button>
                <span className="text-14">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default RightSidebar;

import * as React from 'react';
import style from './Import.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';

const NB = () => {
  return (
    <div className={classname('relative', style.nb)}>
      <div className={classname('flex')}>
        <div className={classname('font-bold text-black')}>N.B</div>
        <div
          style={{ marginLeft: '21px' }}
          className={classname('flex flex-col')}
        >
          <span className={classname('font-bold text-14 text-black')}>
            List should be excel sheet and should contains the following fields:
          </span>
          <span
            className={classname('text-14')}
            style={{ color: 'rgba(0, 0, 0, 0.7)' }}
          >
            names, email, and phoneNumber
          </span>
          <span
            className={classname('text-14')}
            style={{ color: 'rgba(0, 0, 0, 0.7)', marginTop: '21px' }}
          >
            click on the button below and import your list
          </span>
        </div>
      </div>
      <div
        className={classname(
          'flex items-center justify-center relative',
          style.btnSection
        )}
        style={{ marginTop: '33px' }}
      >
        <button
          type="button"
          className={classname(
            'outline-none focus:outline-none flex items-center justify-center rounded-10'
          )}
        >
          <Icon fontSize={36} icon="clarity:import-line" />
          <span className="font-bold text-14 text-black ml-2">Import List</span>
        </button>
        <input type="file" className="absolute opacity-0" />
      </div>
    </div>
  );
};

export default NB;

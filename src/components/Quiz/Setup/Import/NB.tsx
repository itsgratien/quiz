import * as React from 'react';
import style from './Import.module.scss';
import classname from 'classnames';
import ImportButton from './ImportButton';

const NB = ({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
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
      <ImportButton handleChange={handleChange} />
    </div>
  );
};

export default NB;

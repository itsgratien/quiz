import React from 'react';
import { Icon } from '@iconify/react';
import classname from 'classnames';
import style from './Import.module.scss';

const ImportButton = ({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
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
        <span
          className="font-bold text-14import { module } from '../../../../../.next/static/chunks/pages/auth';
 text-black ml-2"
        >
          Import List
        </span>
      </button>
      <input
        type="file"
        className="absolute opacity-0"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .ods"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImportButton;

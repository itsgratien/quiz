import * as React from 'react';
import style from './Header.module.scss';
import classname from 'classnames';
import { Icon } from '@iconify/react';

export const Search = () => {
  return (
    <div
      className={classname(
        'relative flex items-center justify-between',
        style.search
      )}
    >
      <input
        type="text"
        placeholder="Search Anything"
        className={classname('outline-none focus:outline-none')}
      />
      <button type="button">
        <Icon icon="bx:search-alt" fontSize={40} />
      </button>
    </div>
  );
};

export default Search;

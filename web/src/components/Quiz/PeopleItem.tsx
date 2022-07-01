import React from 'react';
import { PeopleItemPropsT } from '@/generated/Quiz';
import classname from 'classnames';
import style from './Style.module.scss';
import { Icon } from '@iconify/react';

export const PeopleItem = ({ item }: PeopleItemPropsT) => {
  return (
    <div className={classname('relative w-full', style.peopleItem)}>
      <div className={classname('relative', style.uri)}>
        <div className={style.link}>{item.quizUri}</div>
        <button
          type="button"
          className={classname(
            'outline-none focus:outline-none flex items-center justify-center',
            style.copyBtn
          )}
        >
          <Icon icon="entypo:creative-commons-share" />
        </button>
      </div>
      <div>
        <span className="font-bold">{item.names}</span>
        <div className="flex items-center">
          <Icon icon="carbon:email" fontSize={20} />
          <small className="ml-1">{item.email}</small>
        </div>
      </div>
    </div>
  );
};

export default PeopleItem;
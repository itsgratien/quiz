import React from 'react';
import classname from 'classnames';
import style from './Start.module.scss';
import { Icon } from '@iconify/react';
import { AttendantStatus } from '@/generated/Enum';
import useTodo from '@/hooks/useTodo';

const Header = () => {
  const todo = useTodo();
  const { changeStatus } = todo;

  return (
    <div
      className={classname(
        style.header,
        'mx-auto flex items-center justify-between'
      )}
    >
      <div className={style.logo}>quiz</div>
      <button
        type="button"
        className={classname(
          style.startButton,
          'flex items-center justify-center'
        )}
        onClick={() => changeStatus && changeStatus(AttendantStatus.InProgress)}
      >
        <Icon
          icon="bi:play-circle-fill"
          fontSize={30}
          color="rgba(0, 0, 0, 0.3)"
        />
        <span className="text-black text-14 ml-3 font-bold">Start</span>
      </button>
    </div>
  );
};

export default Header;

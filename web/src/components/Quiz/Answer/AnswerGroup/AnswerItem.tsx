import * as React from 'react';
import classname from 'classnames';
import style from './AnswerGroup.module.scss';
import { Icon } from '@iconify/react';

const AnswerItem = ({
  value,
  solutions,
  answers,
}: {
  value: string;
  solutions: string[];
  answers?: string[];
}) => {
  const handleCorrectAnswer = () => {
    if (!answers) {
      return false;
    } else {
      let success = false;
      for (const a of answers) {
        const find = solutions.find((item) => item === a);
        if (find && find === value) {
          success = true;
        }
      }
      console.log('answer', answers);
      return success;
    }
  };
  return (
    <div
      className={classname(
        'relative flex items-center justify-between rounded-10',
        style.answerItem
      )}
    >
      <span className={classname('text-14', style.value)}>{value}</span>
      {answers && answers.includes(value) && (
        <Icon
          icon={
            handleCorrectAnswer()
              ? 'akar-icons:circle-check-fill'
              : 'ep:circle-close-filled'
          }
          fontSize={40}
          color={handleCorrectAnswer() ? '#00B76A' : '#FF001F'}
        />
      )}
    </div>
  );
};

export default AnswerItem;

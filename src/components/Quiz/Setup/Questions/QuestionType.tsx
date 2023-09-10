import React from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import styles from './Questions.module.scss';
import { Icon } from '@iconify/react';
import { useQuestion } from '@/hooks/useSetup';

export const QuestionType = () => {
  const { setOpenMcq } = useQuestion();
  return (
    <div
      className={cn(
        'relative flex items-center py-2 mt-5',
        styles.questionType,
      )}
    >
      <Button
        shape="round"
        size="small"
        icon={<Icon icon={'fluent:add-24-filled'} fontSize={15} />}
        className={cn('flex items-center ')}
        onClick={() => setOpenMcq && setOpenMcq(true)}
      >
        multiple choice
      </Button>
      <Button
        shape="round"
        size="small"
        icon={<Icon icon={'fluent:add-24-filled'} fontSize={15} />}
        className={cn('flex items-center')}
      >
        open / close
      </Button>
    </div>
  );
};
export default QuestionType;

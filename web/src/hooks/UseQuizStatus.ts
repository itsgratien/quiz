import React from 'react';
import { UseQuizStatusColorPropsT, QuizStatus } from '@/generated/Shared';

export const useQuizStatusColor = ({ status }: UseQuizStatusColorPropsT) => {
  const [bgColor, setBgColor] = React.useState<string>();

  React.useEffect(() => {
    switch (status) {
      case QuizStatus.Published:
        setBgColor('#B3FF77');
        break;
      case QuizStatus.Draft:
        setBgColor('black');
        break;
      default:
        setBgColor(undefined);
    }
  }, [status]);

  return bgColor;
};

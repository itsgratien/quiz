import React from 'react';
import { UseQuizStatusColorPropsT, QuizStatus } from '@/generated/Quiz';

export const useQuizStatusColor = ({ status }: UseQuizStatusColorPropsT) => {
  const [bgColor, setBgColor] = React.useState<string>();

  React.useEffect(() => {
    switch (status) {
      case QuizStatus.Published:
        setBgColor('#FFEC44');
        break;
      case QuizStatus.Draft:
        setBgColor('rgba(0, 0, 0, 0.12)');
        break;
      default:
        setBgColor(undefined);
    }
  }, [status]);

  return bgColor;
};

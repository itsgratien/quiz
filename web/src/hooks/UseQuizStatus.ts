import React from 'react';
import { UseQuizStatusColorPropsT, QuizStatus } from '@/generated/Quiz';
import { AttendantStatus } from '@/generated/Enum';

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

      case AttendantStatus.Completed:
        setBgColor('#00EF8B');
        break;
      case AttendantStatus.InProgress:
        setBgColor('#00A3FF');
        break;
      case AttendantStatus.Started:
        setBgColor('rgba(0, 0, 0, 0.12)');
        break;
      default:
        setBgColor(undefined);
    }
  }, [status]);

  return bgColor;
};

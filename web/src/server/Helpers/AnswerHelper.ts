export class AnswerHelper {
  getMCQGrade = (
    answers: string[],
    userAnswers: string[]
  ) => {
    const totalPercentage = 100;

    let grade = 0;

    for (const a of userAnswers) {
      if (answers.includes(a)) {
        const calculate = totalPercentage / answers.length;
        grade += calculate;
      }
    }

    return grade;
  };
}

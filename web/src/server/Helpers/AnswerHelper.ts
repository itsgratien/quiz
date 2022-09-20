export class AnswerHelper {
  getMCQGrade = (solutions: string[], answers: string[], points?: number) => {
    const totalPercentage = 100;

    let grade = 0;

    if (solutions.length < answers.length) {
      grade = 0;
    } else {
      for (const a of answers) {
        if (solutions.includes(a)) {
          const calculate = totalPercentage / answers.length;
          grade += calculate;
        }
      }
    }

    return grade;
  };
}

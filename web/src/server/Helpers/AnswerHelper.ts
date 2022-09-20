export class AnswerHelper {
  getMCQGrade = (solutions: string[], answers: string[], points: number) => {
    let grade = 0;

    if (solutions.length < answers.length) {
      grade = 0;
    } else {
      for (const a of answers) {
        if (solutions.includes(a)) {
          const calculate = points / answers.length;
          grade += calculate;
        }
      }
    }

    return grade;
  };
}

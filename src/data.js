window.computeUsersStats = (users, progress, courses) => {
  let  

  const functionPercentage = user => {
    let number = 0;
    courses.map(course => {
      if (user[course]) {
        number += user[course]['percent'];
      }
    });
    return number / courses.length;
  };
  const functionExercises = () => {
    let totalExercises= 0;
    let completedExercises = 0;

    for (let i in resultStudents) {
      let objCourses = progress[resultStudents[i].id]; //return: {intro: {…}}
      if (objCourses.hasOwnProperty("intro")) {
          let arrCourses = Object.keys(progress[resultStudents[i].id]); //return: ["intro"]

          for (let course of arrCourses) {
              let objcourse = progress[resultStudents[i].id][course]['units']; // return: {01-introduction: {…}, 03-ux-design: {…}, 02-variables-and-data-types: {…}}
              if (objcourse.hasOwnProperty("02-variables-and-data-types")) {
                  let arrParts = Object.keys(progress[resultStudents[i].id][course]['units']); // return:[01-introduction: {…}, 03-ux-design: {…}, 02-variables-and-data-types: {…}]

                  for (let part of arrParts) {
                      let objPart = progress[resultStudents[i].id][course]['units'][part]['parts']; //return: {03-comments: {…}, 06-exercises: {…}, 00-values-data-types-and-operators: {…}, 05-quiz: {…}, 04-guided-exercises: {…}, …}
                      if (objPart.hasOwnProperty("06-exercises")) {
                          let arrSubParts = Object.keys(progress[resultStudents[i].id][course]['units'][part]['parts'])//return:["03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises", "01-variables", "02-self-learning-MDN"]

                          // Extracción de ejercicios
                          for (let completed of arrSubParts) {
                              let objCompleted = progress[resultStudents[i].id][course]['units'][part]['parts'][completed]['completed'];
                              console.log(objCompleted)
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
  
  
  const functionReads = user => {
    let units = courses.reduce((accum, c) => user[c] && user[c].units && [...accum, ...Object.values(user[c].units)], []) || [];
    let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
    let partsWithReads = parts.filter(part => part.type === 'read');
    let reads = partsWithReads
    let completedReads = reads.filter(read => read.completed === 1).length;

    return {
      total: reads.length,
      completed: completedReads,
      percent: Math.round(completedReads / reads.length * 100)
    }
  }
  const functionQuizess = user => {
    let units = courses.reduce((accum, c) => user[c] && user[c].units && [...accum, ...Object.values(user[c].units)], []) || [];
    let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
    let partsWithQuizz = flatArray(parts.filter(part => part.type === 'quiz'));
    let quizz = partsWithQuizz
    let completedQuizzes = quizz.filter(quiz => quiz.completed === 1).length;
    let sumScore1 = flatArray(parts.filter(part => part.type === 'quiz' && part.completed === 1));
    let sumScore = sumScore1.reduce((sum, element) => {
      return sum + element.score;
    }, 0);

    return {
      total: quizz.length,
      completed: completedQuizzes,
      percent: Math.round(completedQuizzes / quizz.length * 100),
      scoreSum: sumScore,
      scoreAvg: Math.round(sumScore / completedQuizzes)
    }
  }

  let students = users.filter((user) => user.role === 'student').map(user => {
    const progressUser = progress[user.id];
    return ({
      id: user.id,
      stats: {
        name: user.name,
        percent: functionPercentage(progressUser),
        exercises: functionExercises(progressUser),
        reads: functionReads(progressUser),
        quizzes: functionQuizess(progressUser),
      }
    });
    // return user;
  });
  return students;
}

// window.sortUsers = (users, orderBy, orderDirection) => { }
// window.filterUsers = (users, search) => { }
window.processCohortData = (options) => {
  const courses = Object.keys(options.cohort.coursesIndex);
  let users = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  return users
}

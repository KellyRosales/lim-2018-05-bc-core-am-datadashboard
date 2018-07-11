window.computeUsersStats = (users, progress, courses) => {
  let mapUser = users.filter((us) => us.role === "student").map((student) => {
      // Declaro mis variables acumuladoras
      let percent;
      let exercisesTotal = 0;
      let exercisesCompleted = 0;
      let readsTotal = 0;
      let readsCompleted = 0;
      let quizzesTotal = 0;
      let quizzesCompleted = 0;
      let scoreAvg = 0;
      let scoreSum = 0;

      //Obteniendo porcentaje, ejercicios,reads y quizzes 
      courses.forEach(course => {
          if (progress[student.id].hasOwnProperty(course)) {
              percent = progress[student.id].intro.percent;  // Obteniendo porcentajes
              const unitStudent = progress[student.id].intro.units; //return : {01-introduction: {…}, 03-ux-design: {…}, 02-variables-and-data-types: {…}}

              Object.keys(unitStudent).forEach((nameUnit) => {
                  const partsNameUnit = unitStudent[nameUnit].parts;//return: 05-quiz: {…}, 04-guided-exercises: {…}, 01-variables: {…}, 02-self-learning-MDN: {…}, 03-comments: {…}, …}

                  Object.keys(partsNameUnit).forEach((nameParts) => {
                      const part = partsNameUnit[nameParts]; // return:{duration: 15, completed: 1, type: "read", completedAt: "2018-04-02T06:25:57.010Z"}
                      const type = partsNameUnit[nameParts].type;
                      // Ejercicios
                      if (part.hasOwnProperty("exercises")) {
                          const partsExercises = part.exercises; // return: {01-coin-convert: {…}, 02-restaurant-bill: {…}
                          Object.keys(partsExercises).forEach((nameExercises) => {
                              const recorrPartExercises = partsExercises[nameExercises];
                              exercisesTotal += 1;
                              exercisesCompleted += recorrPartExercises.completed;
                          })
                      };
                      // Lecturas
                      if (part.hasOwnProperty("type")) {
                          if (type === "read") {
                              readsTotal += 1;
                              readsCompleted += part.completed;
                          }
                      }
                      //Quizzes
                      if (part.hasOwnProperty("type")) {
                          if (type === "quiz") {
                              quizzesTotal += 1;
                              quizzesCompleted += part.completed;
                              scoreSum += part.score ? (part.score) : 0; // previniendo undefine
                              scoreAvg += scoreSum / quizzesCompleted ? (scoreSum / quizzesCompleted) : 0 //Previniendo NaN, Promedio de  puntuaciones
                          }
                      }
                  })
              })
          }
      });
      
      const exercisesPercent = Math.round((exercisesCompleted/exercisesTotal)*100);
      const readsPercent = Math.round((readsCompleted/readsTotal)*100);
      const quizzesPercent = Math.round((quizzesCompleted/quizzesCompleted)*100);
      
      const usersWithStats = {
          name: student.name.toUpperCase(),
          stats: {
            percent: isNaN(Math.round(percent)) ? 0 : Math.round(percent),
            exercises: {
              total: exercisesTotal,
              completed: exercisesCompleted,
              percent: exercisesPercent,
            },
            reads: {
              total:readsTotal,
              completed: readsCompleted,
              percent: readsPercent,
            },
            quizzes: {
              total: quizzesTotal,
              completed: quizzesCompleted,
              percent: quizzesPercent,
              scoreSum: Math.round(scoreSum),
              scoreAvg: Math.round(scoreAvg),
            }
          }
        }
        return usersWithStats
  })
  return mapUser;
}
window.sortUsers= (users, orderBy, orderDirection) => {
//ordenar la lista de usuarios en base a orderBy y orderDirection.



  //return: array de usuarios completados
}
window.processCohortData = (options) => {
  const courses = Object.keys(options.cohort.coursesIndex);
  let users = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  return users
}



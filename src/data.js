window.computeUsersStats = (users, progress, courses) => {
  let mapUser = users.filter((us) => us.role === 'student').map((student) => {
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

    const exercisesPercent = Math.round((exercisesCompleted / exercisesTotal) * 100)
    const readsPercent = Math.round((readsCompleted / readsTotal) * 100);
    const quizzesPercent = Math.round((quizzesCompleted / quizzesCompleted) * 100);

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
          total: readsTotal,
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

window.sortUsers = (users, orderBy, orderDirection) => {
  //ordenando según nombre
  if (orderBy === 'Estudiante' && orderDirection === 'ASC') {
    return users.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  else if (orderBy = 'Estudiante' && orderDirection === 'DESC') {
    return users.sort((a, b) => (a.name < b.name ? 1 : -1));
  }
  //ordenando según completitud general
  if (orderBy === 'General' && orderDirection === 'ASC') {
    return users.sort((a, b) => (a.stats.percent > b.stats.percent ? 1 : -1))
  }
  else if (orderBy === 'General' && orderDirection === 'DESC') {
    return users.sort((a, b) => (a.stats.percent < b.stats.percent ? 1 : -1))
  }
  //ordenando según porcentje de ejercicios completados
  if (orderBy === 'Ejercicios' && orderDirection === 'ASC') {
    return users.sort((a, b) => (a.stats.exercises.percent > b.stats.exercises.percent) ? 1 : -1);
  }
  else if (orderBy === 'Ejercicios' && orderDirection === 'DESC') {
    return users.sort((a, b) => (a.stats.exercises.percent < b.stats.exercises.percent) ? 1 : -1);
  }
  //ordenando según porcentaje de lecturas completadas
  if (orderBy === 'Lecturas' && orderDirection === 'ASC') {
    return users.sort((a, b) => (a.stats.reads.percent > b.stats.reads.percent ? 1 : -1))
  }
  else if (orderBy === 'Lecturas' && orderDirection === 'DESC') {
    return users.sort((a, b) => (a.stats.reads.percent < b.stats.reads.percent ? 1 : -1))
  }
  //ordenando según porcentaje de quizzes completados
  if (orderBy === 'Quizzes' && orderDirection === 'ASC') {
    return users.sort((a, b) => (a.stats.quizzes.percent > b.stats.quizzes.percent ? 1 : -1))
  }
  else if (orderBy === 'Quizzes' && orderDirection === 'DESC') {
    return users.sort((a, b) => (a.stats.quizzes.percent < b.stats.quizzes.percent ? 1 : -1))
  }
  //puntuación promedio en quizzes completados,
  if (orderBy === 'prom-quizzes' && orderDirection === 'ASC') {
    return users.sort((a, b) => (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg ? 1 : -1))
  }
  else if (orderBy === 'prom-quizzes' && orderDirection === 'DESC') {
    return users.sort((a, b) => (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg ? 1 : -1))
  }
}

window.filterUsers = (users, search) => {
  //quellos que contengan el string search en el nombre (name) del usuario.
  let userFilter = users.filter((user)=>{
    let newUserFilter = user.name.indexOf(search.toUpperCase());
    newUserFilter !== -1;
    return newUserFilter
  })
  return userFilter
}
window.processCohortData = (options) => {

  const courses = Object.keys(options.cohort.coursesIndex);
  let users = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  users = sortUsers(users, options.orderBy, options.orderDirection);
  users = filterUSers(users,options.search);
  return users
}
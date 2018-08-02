window.computeUsersStats = (users, progress, courses) => {
 
  let mapUser = users.filter((users)=>users.role === "student").map((student) => {
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
          const partsNameUnit = unitStudent[nameUnit].parts;//return: 05-quiz: {…}, 04-guided-exercises: {…}, 01-variables: {…}, 02-self-learning-MDN: {…}, 03-comments: {…}, …}

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
                scoreSum += part.score ? part.score : 0; // previniendo undefine
                scoreAvg += scoreSum / quizzesCompleted ? scoreSum / quizzesCompleted : 0 //Previniendo NaN, Promedio de  puntuaciones
              }
            }
          })
        })
      }
    });

    const exercisesPercent = isNaN(Math.round((exercisesCompleted / exercisesTotal) * 100))? 0 : Math.round((exercisesCompleted / exercisesTotal) * 100);
    const readsPercent =  isNaN(Math.round((readsCompleted / readsTotal) * 100))? 0 : Math.round((readsCompleted / readsTotal) * 100);
    const quizzesPercent = isNaN(Math.round((quizzesCompleted / quizzesTotal) * 100))? 0: Math.round((quizzesCompleted / quizzesTotal) * 100);
    percent = isNaN(Math.round(percent)) ? 0 : Math.round(percent);

    const usersWithStats = {
      stats: {
        name: student.name.toUpperCase(),
        percent: percent,
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
  let userSort;

  if(orderDirection ==='ASC' && orderBy === 'Estudiante'){
    userSort = users.sort((a,b)=> (a.stats.name.toLowerCase()>b.stats.name.toLowerCase()? 1: -1));
    return userSort
  }

  if(orderDirection ==='DESC' && orderBy === 'Estudiante'){
    userSort = users.sort((a,b)=>(a.stats.name.toLowerCase()<b.stats.name.toLowerCase())? 1: -1)
    return userSort
  } 

//ordenando según completitud general
  if (orderDirection ==='ASC'){
    if (orderBy === 'General') {
      userSort = users.sort((a ,b) => {
        return a.stats.percent - b.stats.percent;
      });
    }
  }
  if (orderDirection ==='DESC'){
    if (orderBy === 'General') {
      userSort = users.sort((a ,b) => {
        return b.stats.percent - a.stats.percent;
      });
    }
  }
  //ordenando según porcentaje de ejercicios  completadas
  if (orderDirection ==='ASC'){
    if (orderBy === 'Ejercicios') {
      userSort = users.sort((a ,b) => {
        return a.stats.exercises.percent - b.stats.exercises.percent;
      });
    }
  }
  if (orderDirection ==='DESC'){
    if (orderBy === 'Ejercicios') {
      userSort = users.sort((a ,b) => {
        return b.stats.exercises.percent - a.stats.exercises.percent;
      });
    }
  }
  //ordenando según porcentaje de lecturas completadas
  if (orderDirection ==='ASC'){
    if (orderBy === 'Lecturas') {
      userSort = users.sort((a ,b) => {
        return a.stats.reads.completed - b.stats.reads.completed;
      });
    }
  }
  if (orderDirection ==='DESC'){
    if (orderBy === 'Lecturas') {
      userSort = users.sort((a ,b) => {
        return b.stats.reads.percent - a.stats.reads.percent;
      });
    }
  }
  //ordenando según porcentaje de quizzes completados
  if (orderDirection ==='ASC'){
    if (orderBy === 'Quizzes') {
      userSort = users.sort((a ,b) => {
        return a.stats.quizzes.percent - b.stats.quizzes.percent;
      });
    }
  }
  if (orderDirection ==='DESC'){
    if (orderBy === 'Quizzes') {
      userSort = users.sort((a ,b) => {
        return b.stats.quizzes.percent - a.stats.quizzes.percent;
      });
    }
  }
//puntuación promedio en quizzes completados,
  if (orderDirection === 'ASC'){
    if (orderBy === 'prom-quizzes') {
      userSort = users.sort((a, b) => {
        return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg;
      });
    }
  }
  if (orderDirection === 'DESC'){
    if (orderBy === 'prom-quizzes') {
      userSort = users.sort((a, b) => {
        return b.stats.quizzes.scoreAvg - a.stats.quizzes.scoreAvg;
      });
    }
  }

  return userSort ? userSort : users;
}

window.filterUsers = (users, search) => {
let newUser =users.filter((user) => {
  let userFilter = user.stats.name.toUpperCase().indexOf(search.toUpperCase()) !== -1;
  return userFilter
});
return newUser
}

window.processCohortData = (options) => {

  const courses = Object.keys(options.cohort.coursesIndex);
  let users = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  users = sortUsers(users, options.orderBy, options.orderDirection);
  users = options.search ? filterUsers(users, options.search) : users;
  return users
}

window.computerUsersStats = (users, progress, courses) => {

  if (resultadosSedes.innerHTML === '') {

    //Extracción de alumnas
    for (let i in users) {
      if (users[i].role === 'student') {
        let usersList = document.createElement('li');
        usersList.innerText += users[i].name;
        studentsContainer.appendChild(usersList);
      }
    }
    // Extracción de ejercicios
    for (let i in users) {
      const courses = Object.keys(progress[users[i].id]); // return: "intro"
      let numberExercisesCompleted = 0;
      let numberExercisesPresent = 0;
      let percentExercises = 0;
      for (let course of courses) {
        const objcourse = progress[users[i].id][course]['units'];
        const arraySections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]
        for (let section of arraySections) {
          const objSubSecction = progress[users[i].id][course]['units'][section]['parts'];
          const arraySubSection = Object.keys(objSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]
          for (let subSection of arraySubSection) {
            if (subSection === "06-exercises") {
              const objectExercises = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed']; // 0 , 1 , 1 , 0
              // total: Número total de ejercicios autocorregidos presentes en cursos del cohort.
              const objectNameExercises = progress[users[i].id][course]['units'][section]['parts'][subSection]['exercises']
              const arrayNameExercises = Object.keys(objectNameExercises); // ["01-coin-convert", "02-restaurant-bill"]
              const numberExercisesPresent = arrayNameExercises.length;
              let totalExercisesPresent = numberExercisesPresent;
              objectExercises === parseInt(0) || objectExercises === parseInt(1) || objectExercises === parseInt(0.5) ? (numberExercisesCompleted = objectExercises * 2) : "error"
              percentExercises += objectExercises * 100;
            }
          }
        }
      }
      // completed: Número de ejercicios autocorregidos completados por el usuario.
      let totalExercisesCompleted = numberExercisesCompleted;
      // percent: Porcentaje de ejercicios autocorregidos completados.
      let percentExercisesCompleted = percentExercises;

         //Imprimiendo
// +            let generetionExercises = document.createElement('li');
// +            generetionExercises.innerText = percentExercises;
// +            exercisesContainer.appendChild(generetionExercises);
    
    }
      // Extracción de lecturas (reads)  
      for (let i in users) {
        const courses = Object.keys(progress[users[i].id]); // return: "intro
        let numberReadPresent = 0;
        let numberReadCompleted = 0;
        for (let course of courses) {
          const objcourse = progress[users[i].id][course]['units'];
          const arraySections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]
          for (let section of arraySections) {
            const objSubSecction = progress[users[i].id][course]['units'][section]['parts'];
            const arraySubSection = Object.keys(objSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]

            for (let subSection of arraySubSection) {
              const objectParts = progress[users[i].id][course]['units'][section]['parts'][subSection]['type'] //return: quiz, read, read
              const objectReadCompleted = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed']
              if (objectParts === "read") {
                numberReadPresent += 1;
              }
              objectParts === "read" && objectReadCompleted === parseInt(1) ? (numberReadCompleted += 1) : "error"
            }
          }
        }
        // total: Número total de lecturas presentes en cursos del cohort.
        let readsTotal = numberReadPresent; //11, 11, 11, 11 

        //completed: Número de lecturas completadas por el usuario.
        let readsCompleted = numberReadCompleted; //6, 11,11,8 

        // percent: Porcentaje de lecturas completadas.
        let readsPercent = (numberReadCompleted / numberReadPresent) * 100;
      }
      //Extracción de quizzes    
      const courses = Object.keys(progress[users[i].id]); // return: "intro"
      for (let i in users) {
        let quizCounter = 0;
        let numberQuizCompleted = 0;
        let sumQuizScore = 0;
        for (let course of courses) {
          const objcourse = progress[users[i].id][course]['units'];
          const arraySections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]
          for (let section of arraySections) {
            const objSubSecction = progress[users[i].id][course]['units'][section]['parts'];
            const arraySubSection = Object.keys(objSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]
            for (let subSection of arraySubSection) {
              const objectParts = progress[users[i].id][course]['units'][section]['parts'][subSection]['type'] //return: quiz, read, read
              const objectQuizzCompleted = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed']
              const objectQuizzScore = progress[users[i].id][course]['units'][section]['parts'][subSection]['score']
              if (objectParts === "quiz") {
                quizCounter += 1;
              }
              objectParts === "quiz" && objectQuizzCompleted === parseInt(1) ? (numberQuizCompleted += 1) : "error"

            }
          }
        }
        // completed: Número de quizzes completadas por el usuario
        let quizCompleted = numberQuizCompleted; // 2,3,3, 1

        // percent: Porcentaje de quizzes completadas.
        let percentQuiz = quizCompleted / quizTotal;

        // scoreSum: Suma de todas las puntuaciones (score) de los quizzes completados.
        let scoreSum = sumQuizScore; // 57, 280,190,90

        // scoreAvg: Promedio de puntuaciones en quizzes completados
        // +            let scoreAvgQuiz = scoreSum / quizTotal;

      }
        // percent: Número entero entre 0 y 100 que indica el porcentaje de completitud general del usuario con respecto a todos los cursos asignados a su cohort
        // sumaCompleted = totalExercisesCompleted + readsCompleted + quizCompleted;

        // sumTotal = totalExercisesPresent + readsTotal + quizTotal;
        // percentCompletedGeneral = (sumaCompleted / sumTotal) * 100;
      }


      // let usersWithStats = {
      //     user {
      //         'stats': {
      //             'percent': ' ',
      //             'exercises': {
      //                 'total': ' ',
      //                 'completed': ' ',
      //                 'percent': ' ',
      //             },
      //             'reads': {
      //                 'total': ' ',
      //                 'completed': ' ',
      //                 'percent': ' ',
      //             }
      //         'quizzes': {
      //                 'total': ' ',
      //                 'completed': ' ',
      //                 'percent': ' ',
      //                 'scoreSum': ' ',
      //                 'scoreAvg': ' ',
      //             }
      //         }
      //     }
      // }
    }


    window.sortUsers = (users, orderBy, orderDirection) => {

    }
    window.filterUser = (users, search) => {

    }
    window.processCohortData = (options) => {

    }
    window.generationCohort = (dataCohort) => {
      if (generationContainer.innerHTML === '') {
        for (let i in dataCohort) {
          let generationDocument = document.createElement('li');
          generationDocument.innerText = dataCohort[i].id;
          generationContainer.appendChild(generationDocument);
        }
      }
    };

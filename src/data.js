


// window.computerUsersStats = (users, progress, courses) => {

//     if (studentsContainer.innerHTML === '') {

//         //Extracción de alumnas
//         for (let i in users) {
//             if (users[i].role === 'student') {
//                 let usersList = document.createElement('li');
//                 usersList.innerText += users[i].name;
//                 studentsContainer.appendChild(usersList);
//             }
//         }
//                // Extracción de ejercicios

//                for (let i in users) {
//                 const courses = Object.keys(progress[users[i].id]); // return: "intro"
                
//                 let numberExercisesCompleted = 0;
//                 let numberExercisesPresent = 0;
//                 let percentExercises = 0;
    
//                 for (let course of courses) {
//                     const objcourse = progress[users[i].id][course]['units'];
//                     const arraySections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]
    
//                     for (let section of arraySections) {
//                         const objSubSecction = progress[users[i].id][course]['units'][section]['parts'];
//                         const arraySubSection = Object.keys(objSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]
    
//                         for (let subSection of arraySubSection) {
    
//                             if (subSection === "06-exercises") {
//                                 const objectExercises = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed']; // 0 , 1 , 1 , 0
    
//                                 // total: Número total de ejercicios autocorregidos presentes en cursos del cohort.      
//                                 const objectNameExercises = progress[users[i].id][course]['units'][section]['parts'][subSection]['exercises']
//                                 const arrayNameExercises = Object.keys(objectNameExercises); // ["01-coin-convert", "02-restaurant-bill"]
//                                 const numberExercisesPresent = arrayNameExercises.length;
//                                 let totalExercisesPresent = numberExercisesPresent;
    
//                                 objectExercises === parseInt(0) || objectExercises === parseInt(1) || objectExercises === parseInt(0.5) ? (numberExercisesCompleted = objectExercises * 2) : "error"
    
//                                 percentExercises += objectExercises * 100;
//                             }
    
//                         }
//                     }
//                 }
//                 // completed: Número de ejercicios autocorregidos completados por el usuario.
//                 let totalExercisesCompleted = numberExercisesCompleted;
//                 // percent: Porcentaje de ejercicios autocorregidos completados.
//                 let percentExercisesCompleted = percentExercises;
//                 // Imprimiendo
//                 let generetionExercises = document.createElement('li');
//                 generetionExercises.innerText = percentExercises;
//                 exercisesContainer.appendChild(generetionExercises);
//             }
        



//         // Extracción de lecturas      
//         for (let i in users) {
//             const courses = Object.keys(progress[users[i].id]); // return: "intro"

//             let numberReadPresent = 0;
//             let numberReadCompleted = 0;

//             for (let course of courses) {
//                 const objcourse = progress[users[i].id][course]['units'];
//                 const arraySections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]

//                 for (let section of arraySections) {
//                     const objSubSecction = progress[users[i].id][course]['units'][section]['parts'];
//                     const arraySubSection = Object.keys(objSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]

//                     for (let subSection of arraySubSection) {
//                         const objectParts = progress[users[i].id][course]['units'][section]['parts'][subSection]['type'] //return: quiz, read, read
//                         const objectReadCompleted = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed']

//                         if (objectParts === 'read') {
//                             numberReadPresent += 1;
//                         }

//                         objectParts === 'read' && objectReadCompleted === parseInt(1) ? (numberReadCompleted += 1) : 'error'

//                     }
//                 }
//             }
//             // total: Número total de lecturas presentes en cursos del cohort.
//             let readsTotal = numberReadPresent; //11, 11, 11, 11 

//             //completed: Número de lecturas completadas por el usuario.
//             let readsCompleted = numberReadCompleted; //6, 11,11,8 

//             // percent: Porcentaje de lecturas completadas.
//             let readsPercent = (numberReadCompleted / numberReadPresent) * 100;

//             // Imprimiendo
//             let readsList = document.createElement('li');
//             readsList.innerText = readsPercent;
//             readsContainer.appendChild(readsList);
//         } //final de lecturas

//         //Extracción de quizzes
//         for (let i in users) {
//             const courses = Object.keys(progress[users[i].id]); // return: "intro"
//             let quizCounter = 0;
//             let numberQuizCompleted = 0;
//             let sumQuizScore = 0;

//             for (let course of courses) {
//                 const objcourse = progress[users[i].id][course]['units'];
//                 const arraySections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]

//                 for (let section of arraySections) {
//                     const objSubSecction = progress[users[i].id][course]['units'][section]['parts'];
//                     const arraySubSection = Object.keys(objSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]

//                     for (let subSection of arraySubSection) {
//                         const objectParts = progress[users[i].id][course]['units'][section]['parts'][subSection]['type'] //return: quiz, read, read
//                         const objectQuizzCompleted = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed']
//                         const objectQuizzScore = progress[users[i].id][course]['units'][section]['parts'][subSection]['score']

//                         if (objectParts === 'quiz') {
//                             quizCounter += 1;

//                         }
//                         objectParts === 'quiz' && objectQuizzCompleted === parseInt(1) ? (numberQuizCompleted += 1) : 'error'

//                         objectParts === 'quiz' && objectQuizzCompleted === parseInt(1) ? (sumQuizScore += objectQuizzScore) : 'error'

//                     }
//                 }
//             }
//             // total: Número total de quizzes presentes en cursos del cohort.
//             let quizTotal = quizCounter; // 3,3,3,3

//             // completed: Número de quizzes completadas por el usuario
//             let quizCompleted = numberQuizCompleted; // 2,3,3, 1

//             // percent: Porcentaje de quizzes completadas.
//             let quizPercent = (quizCompleted / quizTotal) * 100;

//             // scoreSum: Suma de todas las puntuaciones (score) de los quizzes completados.
//             let scoreSum = sumQuizScore; // 57, 280,190,90

//             // scoreAvg: Promedio de puntuaciones en quizzes completados
//             let scoreAvgQuiz = scoreSum / quizTotal;

//             // Imprimiendo
//             let quizList = document.createElement('li');
//             quizList.innerText = quizPercent;
//             quizesContainer.appendChild(quizList);
//         } //final de quizes

//         // percent: Número entero entre 0 y 100 que indica el porcentaje de completitud general del usuario con respecto a todos los cursos asignados a su cohort.

//         // sumaCompleted = totalExercisesCompleted + readsCompleted + quizCompleted;

//         // sumTotal = totalExercisesPresent + readsTotal + quizTotal;

//         // percentCompletedGeneral = (sumaCompleted / sumTotal) * 100;


//     }

//     // let usersWithStats = {
//     //     user {
//     //         'stats': {
//     //             'percent': ' ',
//     //             'exercises': {
//     //                 'total': ' ',
//     //                 'completed': ' ',
//     //                 'percent': ' ',
//     //             },
//     //             'reads': {
//     //                 'total': ' ',
//     //                 'completed': ' ',
//     //                 'percent': ' ',
//     //             }
//     //         'quizzes': {
//     //                 'total': ' ',
//     //                 'completed': ' ',
//     //                 'percent': ' ',
//     //                 'scoreSum': ' ',
//     //                 'scoreAvg': ' ',
//     //             }
//     //         }
//     //     }
//     // }
// }
window.computerUsersStats = (users, progress, courses) => {
    
    const getResult = users.map( (user) => { 
    //user = {id: "00hJv4mzvqM3D9kBy3dfxoJyFV82", signupCohort: "lim-2018-03-pre-core-pw", timezone: "America/Lima", name: "Lizeth", locale: "es-}
        
      courses.forEach(courseName => {
         // recorriendo los cursos

          if(progress[user.id].hasOwnProperty(courseName)){// return: ['intro']
          const percent = progress[user.id].intro.percent; // return : {id: "cdmx-2017-01-bc-core-egresadas20171bootcamp", usersCount: 2, start: "2017-01-01", coursesIndex: {…}, end: "2017-06-30"}
          console.log(percent)
          const userUnits = progress[user.id].intro.units;
         // extrayendo ejercicios
          let totalExcercises = 0;
          let completedExercises = 0;
          let totalReads = 0;
          let completedReads= 0;
          let totalQuizzes=0;
          let completedQuizzes=0;
          let scoreSum=0;
          let scoreAvg=0;
          Object.keys(userUnits).forEach((unitName) => {
            const parts = userUnits[unitName].parts
            Object.keys(parts).forEach((partName) => {
              const part = parts[partName];
              if (part.hasOwnProperty('exercises')) {
                const exercises = part.exercises;
                Object.keys(exercises).forEach((exerciseName) => {
                  const excercise = exercises[exerciseName]
                  totalExcercises += 1;
                  completedExercises += excercise.completed;
                })
              }
              if (part.hasOwnProperty('type')) {
                if(part.type === 'read'){
                totalReads += 1; 
                completedReads += part.completed 
                }
              }       
              if (part.hasOwnProperty('type')) {
                if(part.type === 'quiz'){
                totalQuizzes +=1;
                completedQuizzes += part.completed;
                scoreSum += part.score ? part.score : 0; //si existe 'score' sumarle el valor del mismo, si no exite, no sumarle nada y continuar
                scoreAvg = scoreSum/completedQuizzes ? scoreSum/completedQuizzes : 0;
                }
              }    
            })
          })
          const percentExercises = (completedExercises / totalExcercises)*100
          
          /*console.log(user.id, 'Percent completed exercises', percentExercises)
          console.log(totalExcercises);
          console.log(completedExercises);*/
  
          const percentReads = (completedReads / totalReads)*100
  
          /*console.log(user.id, 'Percent completed Reads', percentReads)
          console.log(totalReads);
          console.log(completedReads);*/
  
          const percentQuizzes = (completedQuizzes / totalQuizzes)*100
          
          console.log(percent)
          console.log(user.id, 'Percent completed Quizzes', percentQuizzes.toFixed(2))
          console.log(totalQuizzes);
          console.log(completedQuizzes)
          console.log(scoreSum)
          console.log(scoreAvg.toFixed(2))
  
    
          const usersWithStats = {
            name: user.name,
            stats: {
              percent: percent,
              exercises: {
                total: totalExcercises,
                completed: completedExercises,
                percent: percentExercises,
              },
              reads: {
                total: totalReads,
                completed: completedReads,
                percent: percentReads,
              },
              quizzes: {
                total: totalQuizzes,
                completed: completedQuizzes,
                percent: percentQuizzes,
                scoreSum: scoreSum,
                scoreAvg: scoreAvg,
              }
            }
          }
          
          console.log(usersWithStats)
  
          return usersWithStats;
        } 
      })
    });

   return getResult;
   
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


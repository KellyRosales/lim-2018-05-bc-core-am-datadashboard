

window.computerUsersStats = (users, progress, courses) => {
    //Extracción de alumnas
    if (studentsContainer.innerHTML === "") {
        for (let i in users) {
            if (users[i].role === "student") {
                let usersDocument = document.createElement('li');
                usersDocument.innerText += users[i].name;
                studentsContainer.appendChild(usersDocument);
            }
        }

        // Extracción de ejercicios
        let completedExercises = [];
        let arrExercises = []
        for (let i in users) {
            const courses = Object.keys(progress[users[i].id]); // return: "intro"
            let percentExercises = 0;

            for (let course of courses) {
                const objcourse = progress[users[i].id][course]['units'];
                const arrayOfSections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]

                for (let section of arrayOfSections) {
                    const objOfSubSecction = progress[users[i].id][course]['units'][section]['parts'];
                    const arrayOfSubSection = Object.keys(objOfSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]

                    for (let subSection of arrayOfSubSection) {

                        if (subSection === "06-exercises") {
                            const objectOfExercises = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed'];
                            completedExercises.push(objectOfExercises); // 0 , 1 , 1 , 0

                            //total de ejercicios autocorregidos
                            const objectNameOfExercises = progress[users[i].id][course]['units'][section]['parts'][subSection]['exercises']
                            const arrayNameOfExercises = Object.keys(objectNameOfExercises); // ["01-coin-convert", "02-restaurant-bill"]
                            const numberNameExercises = arrayNameOfExercises.length;

                            //porcentaje de ejercicios completados 
                            percentExercises += objectOfExercises * 100;

                        }
                    }
                }
            }
            //Imprimiendo
            let generetionExercises = document.createElement('li');
            generetionExercises.innerText = percentExercises;
            exercisesContainer.appendChild(generetionExercises);
        }
        // completed: Número de ejercicios completados por el usuario.
        completedExercises.map(elem => {
            var num = elem * 2
            arrExercises.push(num);
        })

        // Extracción de lecturas (reads)
       
        for (let i in users) {
            const courses = Object.keys(progress[users[i].id]); // return: "intro"
           
            let readCounter = 0;
            let numberReadCompleted = 0;           
            let percentReadsCompleted = 0;

            for (let course of courses) {
                const objcourse = progress[users[i].id][course]['units'];
                const arrayOfSections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]

                for (let section of arrayOfSections) {
                    const objOfSubSecction = progress[users[i].id][course]['units'][section]['parts'];
                    const arrayOfSubSection = Object.keys(objOfSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]

                    for (let subSection of arrayOfSubSection) {
                        const objectOfParts = progress[users[i].id][course]['units'][section]['parts'][subSection]['type'] //return: quiz, read, read
                        const objectReadCompleted = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed']

                        if (objectOfParts === "read") {
                            readCounter += 1;

                        }

                        objectOfParts === "read" && objectReadCompleted === parseInt(1) ? (numberReadCompleted += 1) : "error"

                        // percent: Porcentaje de lecturas completadas.
                        // objectOfParts === "read" && objectReadCompleted === parseInt(1) ? (percentReadsCompleted = (readsCompleted / readsTotal) * 100) : "error"
                        // console.log(percentReadsCompleted)

                    }
                }
            }
            // total: Número total de lecturas presentes en cursos del cohort.
            let readsTotal = readCounter; //11, 11, 11, 11 

            //completed: Número de lecturas completadas por el usuario.
            let readsCompleted = numberReadCompleted; //6, 11,11,8 
        
            // function functionReadsCompleted(objectOfParts, objectReadCompleted) {
            // functionReadsCompleted(objectOfParts, objectReadCompleted) 

        }

        //Extracción de quizzes
      

        for (let i in users) {
            const courses = Object.keys(progress[users[i].id]); // return: "intro"

            let quizCounter = 0;
            let numberQuizCompleted = 0;
            let sumQuizScore = 0; 

            for (let course of courses) {
                const objcourse = progress[users[i].id][course]['units'];
                const arrayOfSections = Object.keys(objcourse); //return: ["01-introduction", "03-ux-design", "02-variables-and-data-types"]

                for (let section of arrayOfSections) {
                    const objOfSubSecction = progress[users[i].id][course]['units'][section]['parts'];
                    const arrayOfSubSection = Object.keys(objOfSubSecction)  //return: ["01-variables", "02-self-learning-MDN", "03-comments", "06-exercises", "00-values-data-types-and-operators", "05-quiz", "04-guided-exercises"]

                    for (let subSection of arrayOfSubSection) {
                        const objectOfParts = progress[users[i].id][course]['units'][section]['parts'][subSection]['type'] //return: quiz, read, read
                        const objectQuizzCompleted = progress[users[i].id][course]['units'][section]['parts'][subSection]['completed']
                        const objectQuizzScore = progress[users[i].id][course]['units'][section]['parts'][subSection]['score']

                        if (objectOfParts === "quiz") {
                            quizCounter += 1;
                           
                        }
                        objectOfParts === "quiz" && objectQuizzCompleted === parseInt(1) ? (numberQuizCompleted += 1) : "error"

                        // objectOfParts === "quiz" && objectQuizzCompleted === parseInt(1) ? 

                        objectOfParts === "quiz" && objectQuizzCompleted === parseInt(1) ? (sumQuizScore += objectQuizzScore) : "error"

                        // objectOfParts === "quiz" && objectQuizzCompleted === parseInt(1) ? (promQuizScore += total de suma /numero de elem) : "error"
                    }
                }
            }
            // total: Número total de quizzes presentes en cursos del cohort.
            let quizTotal = quizCounter; // 3,3,3,3

            // completed: Número de quizzes completadas por el usuario
            let quizCompleted = numberQuizCompleted; // 2,3,3, 1
           
            // percent: Porcentaje de quizzes completadas.

            // scoreSum: Suma de todas las puntuaciones (score) de los quizzes completados.
            let scoreSum = sumQuizScore ; // 57, 280,190,90
           
             // scoreAvg: Promedio de puntuaciones en quizzes completados
            //  let scoreAvg = 

        }
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
    if (generationContainer.innerHTML === "") {
        for (let i in dataCohort) {
            let generationDocument = document.createElement('li');
            generationDocument.innerText = dataCohort[i].id;
            generationContainer.appendChild(generationDocument);
        }
    }
};


window.computerUsersStats = (users, progress, courses) => {
    if (studentsContainer.innerHTML === "") {
        for (let i in users) {
            if (users[i].role === "student") {
                let usersDocument = document.createElement('li');
                usersDocument.innerText += users[i].name;
                studentsContainer.appendChild(usersDocument);
            }
        }
    }

    let completedExercises = [];
    let arrExercises = []
    for (let i in users) {
        const courses = Object.keys(progress[users[i].id]); // return: "intro"- devuelve el valor
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

}


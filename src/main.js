//accediendo a elementos del DOM 
let listVenue = document.querySelector('#cohorts');
let generationContainer = document.getElementById('generation-container'); 
let studentsContainer = document.getElementById('students-container');

// creando el objeto "options"
let options = {
    cohort: null, //Objeto cohort (de la lista de cohorts)
    cohortData: {
        users: null,//Arreglo de usuarios miembros del cohort.
        progress: null, //Objeto con data de progreso de cada usuario 
    },
    orderBy: 'name', // String con criterio de ordenado, ver sortUsers
    orderDirection: 'ASC', //String con dirección de ordenado (ver sortUsers).
    search: ' ',//String de búsqueda (ver filterUsers)
};

// Función de solicitud XHR
const getData = (str, url, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', event => {
      if (event.target.readyState === 4 && event.target.status === 200) {
        const response = (JSON.parse(event.target.responseText));
        callback(str, response)
      }
    });
    xhr.send();
    }


//Funciones callback
const callbackCohorts = (sede, dataCohorts) => {
    options.cohort = dataCohorts; // array de cohorts
    const cohortsOfSede = dataCohorts.filter(cohort => {
        return cohort.id.indexOf(sede) !== -1;
    });
    generationContainer.innerHTML = '';
    for (cohort of cohortsOfSede) {
        generationContainer.innerHTML += `
        <div  class="generation">
            <div id='${cohort.id}'>${cohort.id}</div>
        </div>`;
    };
}

const callbackProgress = (studentProgress, dataProgress) => {
    options.cohortData.progress = dataProgress;
    const arrayFourFunction = processCohortData(options);
    studentsContainer.innerHTML= '';
    for (const user of arrayFourFunction ){
        studentsContainer.innerHTML +=
        `
        <div  class="students">
            <div >${user.stats.name}</div>
            <div >${user.stats.percent}</div>
            <div >${user.stats.exercises.completed}</div>
            <div >${user.stats.reads.completed}</div>
            <div>${user.stats.quizzes.completed}</div>
        </div>`
    }
}

const callbackUsers = (person, dataUsers) => {
    options.cohortData.users = dataUsers;
    //Extrayendo los archivos JSON de progress
    getData(person, `../../data/cohorts/${person}/progress.json`, callbackProgress);
}

// Eventos click
//Extrayendo los archivos JSON de cohorts
listVenue.addEventListener('click', (event) => {
    getData(event.target.id, '../../data/cohorts.json', callbackCohorts)
});
//Extrayendo los archivos JSON de users
generationContainer.addEventListener('click', (event) => {
    //reasignando el objeto options
    options.cohort.forEach((generation) => {
        if (generation.id === event.target.id) {
            options.cohort = generation;
        }
    });
    getData(event.target.id, `../../data/cohorts/${event.target.id}/users.json`, callbackUsers)
});

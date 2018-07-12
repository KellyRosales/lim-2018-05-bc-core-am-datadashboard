//accediendo a elementos del DOM 
let listVenue = document.querySelector('#cohorts');
let generationContainer = document.getElementById('generation-container');
let studentsContainer = document.getElementById('container');
let orderBy = document.getElementById('conteiner-orderBy');
let orderDirection=document.getElementById('conteiner-orderDirection');



// creando el objeto "options"
let options = {
    cohort: 0, //Objeto cohort (de la lista de cohorts)
    cohortData: {
        users: 0,//Arreglo de usuarios miembros del cohort.
        progress: 0, //Objeto con data de progreso de cada usuario 
    },
    orderBy: 'Estudiante', // String con criterio de ordenado, ver sortUsers
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

//Funcion de almacenado de datos  mostrados en la tabla
const searchData = (fourFunction) => {
    console.log(fourFunction)
    for (const users of fourFunction) {
        const row = document.createElement('tr')
        row.innerHTML += `
                  <th scope="row"> ${users.name} </th>
                  <td >${users.stats.percent}%</td>
                  <td >${users.stats.exercises.percent}</td>
                  <td >${users.stats.reads.percent}</td>
                  <td>${users.stats.quizzes.percent}</td>       
                  <td>${users.stats.quizzes.scoreSum}</td>
            `
        studentsContainer.appendChild(row)
    }
}
//Funciones callback
const callbackCohorts = (sede, dataCohorts) => {
    options.cohorts = dataCohorts; // array de cohorts
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
    const fourFunction = processCohortData(options);

    studentsContainer.innerHTML = '';
    searchData(fourFunction)
}

const callbackUsers = (person, dataUsers) => {
    options.cohortData.users = dataUsers;
    //Extrayendo los archivos JSON de progress
    getData(person, `../../data/cohorts/${person}/progress.json`, callbackProgress);
}
console.log(options)
// Eventos click
//Extrayendo los archivos JSON de cohorts
listVenue.addEventListener('click', (event) => {
    getData(event.target.id, '../../data/cohorts.json', callbackCohorts)
});
//Extrayendo los archivos JSON de users
generationContainer.addEventListener('click', (event) => {
    //reasignando el objeto options
    const objCohorts =options.cohorts;
    objCohorts.forEach((element) => {
        if (element.id === event.target.id) {
            options.cohort = element;
        }
    });

    getData(event.target.id, `../../data/cohorts/${event.target.id}/users.json`, callbackUsers)
});

orderDirection.addEventListener('change', (event) => {
 
       options.orderDirection = orderDirection.value
       options.orderBy = orderBy.value

        const dataOrderBy = processCohortData(options); // llama a la funcionalidad
console.log(dataOrderBy)        
        studentsContainer.innerHTML =''; 
        searchData(dataOrderBy);        
    
})
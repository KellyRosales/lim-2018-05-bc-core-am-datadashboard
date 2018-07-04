// En este caso puedes usar main.js para todo tu código que tenga que ver con mostrar los datos en la pantalla,

getFunctions = () => {
    getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, dataUsers) => {
        getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, dataProgress) => {
            getData('../data/cohorts.json', (err, dataCohorts) => {
                computerUsersStats(dataUsers, dataProgress, dataCohorts)
            });
        });
    });
}
const resultadosUser = document.getElementById('mostrar-students');
resultadosUser.addEventListener('click', getFunctions);
const studentsContainer = document.getElementById('students-container');

const exercisesContainer = document.getElementById('exercises-container');


getGeneration = () => {
    getData('../data/cohorts.json', (err, dataCohorts) => {
        generationCohort(dataCohorts);
    });
}


const resultadosGeneration= document.getElementById('mostrar-generation');
resultadosGeneration.addEventListener('click',getGeneration);
const generationContainer = document.getElementById('generation-container');


// Función para hacer las conexiones  XHR 
const getData = (url, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data1 = JSON.parse(xhr.responseText);
            callback(null, data1);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

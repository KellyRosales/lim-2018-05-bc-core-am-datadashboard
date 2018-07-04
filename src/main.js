// // En este caso puedes usar main.js para todo tu código que tenga que ver con mostrar los datos en la pantalla,

// getFunctions = () => {
//     getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, dataUsers) => {
//         getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, dataProgress) => {
//             getData('../data/cohorts.json', (err, dataCohorts) => {
//                 computerUsersStats(dataUsers, dataProgress, dataCohorts)
//             });
//         });
//     });
// }
// const resultadosUser = document.getElementById('mostrar-students');
// resultadosUser.addEventListener('click', getFunctions);
// const studentsContainer = document.getElementById('students-container');

// const exercisesContainer = document.getElementById('exercises-container');


// getGeneration = () => {
//     getData('../data/cohorts.json', (err, dataCohorts) => {
//         generationCohort(dataCohorts);
//     });
// }


// const resultadosGeneration= document.getElementById('mostrar-generation');
// resultadosGeneration.addEventListener('click',getGeneration);
// const generationContainer = document.getElementById('generation-container');


// // Función para hacer las conexiones  XHR 
// const getData = (url, callback) => {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             var data1 = JSON.parse(xhr.responseText);
//             callback(null, data1);
//         }
//     }
//     xhr.open('GET', url, true);
//     xhr.send();
// }


//VOLVIENDO HACER LOS LLAMADOS CALLBACK
//Llamando elementos del DOM / INTERACTUANDO CON EL CLIK
const listVenue = document.querySelectorAll('.venue-list');  //Sedes
console.log(listVenue);

for(const venue of listVenue){ //
    venue.addEventListener('click', (event)=>{
        console.log(event.target);
    })
}; 

cada vez que hagan click por cada nodo (venue) se ejecute un console log del event target  

 const generationContainer=document.getElementById('generation-container'); //generaciones o promociones

listVenue.addEventListener('click', (event)=>{
    //insertando el nombre de quien le doy valor
    generationContainer.innerHTML= 
    `<option value="" class="generation"> ${event.target.id}  </option>`
 }),


// FUNCION PARA HACER LAS CONEXIONES XHR (1 función)
 getData = (str, url, callback) => {
    let  xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            callback(str, response);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}
// declarando A- 2función //Filtra las sedes
const callbackCohorts=(campus, dataCohorts)=>{
console.log(campus, dataCohorts)
}
  
// llamado A-3 función
listVenue.addEventListener('click',(event)=>{
getData(event.target.id,'../data/cohorts.json', callbackCohorts)
});

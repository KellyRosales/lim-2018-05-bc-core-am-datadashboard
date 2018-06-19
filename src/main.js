//En este caso puedes usar main.js para todo tu código que tenga que ver con mostrar los datos en la pantalla,
const studentsButton=document.getElementById('submit-btn');
const studentsContainer=document.getElementById('response-container');

studentsButton.addEventListener('click', function(e){
e.preventDefault();
getStudents();
})

function getStudents(){
    const request = new XMLHttpRequest();
    request.open('GET','../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    request.onload = addStudents;
    request.onerror = handleError;
    request.send();
    console.log(request.responseText);
}
function handleError (){
    console.log('error');
}

function addStudents (){
    const data=JSON.parse(event.target.responseText);
    for (let i=0; i<data.length; i++){
        let li = document.createElement('li');
        li.innerText=data[i].name;
        studentsContainer.appendChild(li);
    }
}
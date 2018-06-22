//En este caso puedes usar main.js para todo tu código que tenga que ver con mostrar los datos en la pantalla,

const studentsButton = document.getElementById('submit-btn');
const studentsContainer = document.getElementById('response-container');

studentsButton.addEventListener('click', (e) => {
    e.preventDefault();
    getStudents();
})
const getStudents = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    request.onload = addStudents;
    request.onerror = handleError;
    request.send();
}
const handleError = () => {
    console.log('error');
}
//debe ir en data.js igual que todas las funcionalidades
const addStudents = () => {
    const data = JSON.parse(event.target.responseText);
    //computeUsersStats(data)
    for (let i = 0; i < data.length; i++) {
        let users = document.createElement('li');
        users.innerText = data[i].name;
        studentsContainer.appendChild(users);
    }
}


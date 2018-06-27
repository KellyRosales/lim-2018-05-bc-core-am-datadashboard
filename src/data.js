

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


    for (let i in progress) {
        const exercesisProgress = Object.keys(progress);
        let exercisesDocument = document.createElement('li');
        exercisesDocument.innerHTML += exercesisProgress[i]['intro']['units']['02-variables-and-data-types']['parts']['06-exercises']['completed'];
        exercisesContainer.appendChild(exercisesDocument);
    }

}



window.sortUsers = (users, orderBy, orderDirection) => {

}
window.filterUser = (users, search) => {

}
window.processCohortData = (options) => {

}
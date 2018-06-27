

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


}
window.sortUsers = (users, orderBy, orderDirection) => {

}
window.filterUser = (users, search) => {

}
window.processCohortData = (options) => {

}
window.generationCohort = (dataCohort) => {
    if (generationContainer.innerHTML === ""){
        for( let i in dataCohort){
            let generationDocument = document.createElement('li');
            generationDocument.innerText= dataCohort[i].id;
            generationContainer.appendChild(generationDocument);
        }
    }

}


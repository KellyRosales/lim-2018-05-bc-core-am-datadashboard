window.computerUsersStats = (users, progress, courses) => {} 
window.sortUsers = (users, orderBy, orderDirection) => { }
window.filterUsers = (users, search) => { }

window.processCohortData = (options) => {
    const courses = Object.keys(options.cohort.coursesIndex);
    let users = computerUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    return users
}

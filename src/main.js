//En este caso puedes usar main.js para todo tu código que tenga que ver con mostrar los datos en la pantalla,

const studentsButton=document.getElementById('submit-btn');
const studentsContainer=document.getElementById('response-container');

studentsButton.addEventListener('click', (e) => {
e.preventDefault();
getStudents();
})  
const  getStudents =()=> {
    const request = new XMLHttpRequest();
    request.open('GET','../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    request.onload = addStudents;
    request.onerror = handleError;
    request.send();
}
const handleError=()=>{
    console.log('error');
}
//debe ir en data.js igual que todas las funcionalidades
const addStudents =()=>{
    const data=JSON.parse(event.target.responseText);
    //computeUsersStats(data)
    for (let i=0; i<data.length; i++){
        let li = document.createElement('li');
        li.innerText=data[i].name;
        studentsContainer.appendChild(li);
    }
}

<<<<<<< HEAD
//para extraer los ejercicios
const exercisesContainer = document.getElementById('container-exercises');
const exercisesButton =document.getElementById('btn-exercises');
exercisesButton.addEventListener('click',(e)=> {
e.preventDefault ();
getExercises();
})

getExercises = ()=>{
    const exercisesRequest = new XMLHttpRequest (); 
    exercisesRequest.open('GET','../data/cohorts/lim-2018-03-pre-core-pw/progress.json');
    exercisesRequest.onload=addExercises;
    exercisesRequest.onerror= handleError;
    exercisesRequest.send();
};

    //convertir un el objeto en un array para poder ingresar y buscar progress
    // map es un metodo de arrays que te devuelve otro array
addExercises=()=>{

    const dataExercises = JSON.parse(event.target.response);
    const converExercises = Object.keys(dataExercises);
    let li = document.createElement('li');
    li.innerHTML=dataExercises[i].
    exercisesContainer.appendChild(li);
    console.log(converExercises);


    // for (let i=0; i<dataExcercises; i++){
    //    let li=document.createElement('li');
    //  li.innerText=dataExcercises[i].
    }
=======










































































    //Menu desplegable
	let menuSede=document.getElementById("Sede1");
	let menuGeneracion=document.getElementById("Generacion1");
    let menuCursos=document.getElementById("Cursos1");
    let menuAlumnas=document.getElementById("Alumnas1");

   	
   //Acción al hacer click a Sede de la lista desplegable
	document.getElementById("Sede").addEventListener("click",()=>{
			menuSede.style.display="block";
			menuGeneracion.style.display="none";
			menuCursos.style.display="none";			
			menuAlumnas.style.display="none";
    })
>>>>>>> b943443f3901ee2a8240429cdfee76ad2786ac58

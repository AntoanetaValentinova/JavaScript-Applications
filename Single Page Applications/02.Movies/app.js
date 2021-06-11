import {setupRegister} from './register.js';
import {setupLogin} from './login.js';
import {setupLogout} from './logout.js';
import {setupAddMovie,loadAllMovies} from './addMovie.js';
import {setupEdit} from './edit.js';
import {setupDetails} from './showDetails.js';


let movies=document.querySelector('div>nav>a');
movies.addEventListener('click',()=>{startView()})
let navBar=document.querySelector('#container').firstElementChild;
let homePage=document.querySelector('#home-page').firstElementChild;
let moviesTitle=[...document.querySelector('#container').children][2];
let addMovieButton=document.querySelector('#add-movie-button');
let moviesSection=document.querySelector('#movie')
let addMovieSection=document.querySelector('#add-movie');
let movieExample=document.querySelector('#movie-example');
let editMovieSection=document.querySelector('#edit-movie');
let loginSection=document.querySelector('#form-login');
let registerSection=document.querySelector('#form-sign-up');
let footer=document.querySelector('footer');
const liElementsNavBar=[...document.querySelector('ul').children];
let welcomeNav=liElementsNavBar[0];
let logoutNav=liElementsNavBar[1];
let loginNav=liElementsNavBar[2];
let registerNav=liElementsNavBar[3];


function start() {
    startView();
    setupNavBar();
    setupRegister(registerSection,registerNav);
    setupLogout(logoutNav);
    setupLogin(loginSection,loginNav);
    setupAddMovie(addMovieSection,addMovieButton);
    setupEdit(editMovieSection);
    setupDetails(movieExample);
    
}
start();

export function hideStartView() {
    homePage.style.display='none';
    moviesTitle.style.display='none';
    addMovieButton.style.display='none';
    moviesSection.style.display='none';
    movieExample.style.display='none';
    editMovieSection.style.display='none';
    loginSection.style.display='none';
    registerSection.style.display='none'
}

export function startView() {
   setupNavBar();
   loadAllMovies();
   const token=sessionStorage.getItem('userToken');
   if (token!==null) {
       addMovieButton.style.display='block'
   } else {
     addMovieButton.querySelector('a').style.display ='none'
   }
   addMovieSection.style.display='none';
   movie.style.display='none';
   movieExample.style.display='none';
   editMovieSection.style.display='none';
   loginSection.style.display='none';
   registerSection.style.display='none';
   homePage.style.display='block';
   moviesTitle.style.display='block';
   addMovieButton.style.display='block';
   moviesSection.style.display='block';
}

function setupNavBar() {
    const token=sessionStorage.getItem('userToken');
    const email=sessionStorage.getItem('email');
    if (token===null) {
        welcomeNav.style.display='none';
        logoutNav.style.display='none';
        loginNav.style.display='block';
        registerNav.style.display='block';
    } else {
        welcomeNav.querySelector('a').textContent=`Welcome, ${email}`;
        welcomeNav.style.display='block';
        logoutNav.style.display='block';
        loginNav.style.display='none';
        registerNav.style.display='none';
    }
}

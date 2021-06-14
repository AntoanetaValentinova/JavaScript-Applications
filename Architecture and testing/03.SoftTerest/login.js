
import {post} from './api.js';
import {showHome} from './home.js';
import {setupNavigation} from './app.js';

let main;
let section;

export function setupLogin(mainTarget, sectionTraget) {
    main=mainTarget;
    section=sectionTraget;
}

export function showLogin() {
    main.innerHTML='';
    main.appendChild(section);
    document.querySelector('form').addEventListener('submit',login)
}

async function login(ev) {
    ev.preventDefault();

    //get form data
    const formData=new FormData(ev.target);
    const email=formData.get('email');
    const password=formData.get('password');

    //make request
    const data=await post('http://localhost:3030/users/login',{email,password});
  
    //set session storage
    sessionStorage.setItem('email',email);
    sessionStorage.setItem('password',password);
    sessionStorage.setItem('id',data._id);
    sessionStorage.setItem('userToken',data.accessToken);

    //clear form
    ev.target.reset();

    //redirect to home page with right nav bar
    showHome();
    setupNavigation();

    
}
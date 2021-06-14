import {post} from './api.js';
import {showHome} from './home.js';
import {setupNavigation} from './app.js';

let main;
let section;

export function setupRegister(mainTarget, sectionTraget) {
    main=mainTarget;
    section=sectionTraget;
}

export function showRegister() {
    main.innerHTML='';
    main.appendChild(section);
    document.querySelector('form').addEventListener('submit',register)
}

async function register(ev) {
    ev.preventDefault();

    //get data from form
    const formData=new FormData(ev.target);
    const email=formData.get('email');
    const password=formData.get('password');
    const rePass=formData.get('repeatPassword');

    //validations
    if (email.length<3) {
        return alert('Email must be at least 3 characters')
    }
    if (password.length<3) {
        return alert('Password must be at least 3 characters')
    }
    if (password!==rePass) {
        return alert('Passwords must be equal!')
    }

    //make request
    const data=await post('http://localhost:3030/users/register',{email,password});
  
    //manage session storage
    sessionStorage.setItem('email',email);
    sessionStorage.setItem('password',password);
    sessionStorage.setItem('userToken',data.accessToken);
    sessionStorage.setItem('id',data._id);

    //redirect to home page with right nav bar
    showHome();
    setupNavigation();
}
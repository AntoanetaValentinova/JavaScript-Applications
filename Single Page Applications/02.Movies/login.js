import { hideStartView, startView} from './app.js'

let section;

export function setupLogin(sectionTarget,loginNav) {
    section=sectionTarget;
    loginNav.querySelector('a').addEventListener('click',showLoginPage);
}

 function showLoginPage (e) {
    hideStartView();
    section.style.display='block';
    section.querySelector('form').addEventListener('submit',loginUser)
}

async function loginUser(e) {
    e.preventDefault();
    const form=section.querySelector('form');
    let formData=new FormData(form);
    const email=formData.get('email');
    const password=formData.get('password');

    const responce=await fetch('http://localhost:3030/users/login',{
        method:'post',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({email,password})
    })
    if (responce.ok===false) {
        const error=await responce.json();
        return alert(error.message);
    }

    const data=await responce.json();

    sessionStorage.setItem('userToken',data.accessToken);
    sessionStorage.setItem('email',email);
    sessionStorage.setItem('password',password);
    sessionStorage.setItem('id',data._id);

    startView();
}
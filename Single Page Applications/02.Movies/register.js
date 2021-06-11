import { hideStartView, startView} from './app.js'


let section;

export function setupRegister(sectionTarget,registerNav) {
    section=sectionTarget;
    registerNav.querySelector('a').addEventListener('click',showRegisterPage);
}

 function showRegisterPage (e) {
    hideStartView();
    section.style.display='block';
    section.querySelector('form').addEventListener('submit',createUser)

}

async function createUser(e) {
    e.preventDefault();
    const form=section.querySelector('form');
    let formData=new FormData(form);
    const email=formData.get('email');
    const password=formData.get('password');
    const repeatPassword=formData.get('repeatPassword');
    if (email==='') {
        return alert('Email cant be empty!')
    }
    if (password.length<6) {
        return alert('Password must be at least 6 characters!')
    }
    if (password!==repeatPassword) {
        return alert('Passwords doesnt match!')
    }
    const responce=await fetch('http://localhost:3030/users/register',{
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
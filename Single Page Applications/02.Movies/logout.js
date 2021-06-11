import { startView } from './app.js'



export function setupLogout(logoutNav) {
    logoutNav.querySelector('a').addEventListener('click', logout);
}

async function logout(e) {
    const token = sessionStorage.getItem('userToken');
    if (token !== null) {
        const responce = await fetch('http://localhost:3030/users/login', {
            method: 'delete'
        })
        if (responce.ok === false) {
            const error = await responce.json();
            return alert(error.message);
        }
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('id');
    }

    startView();
}





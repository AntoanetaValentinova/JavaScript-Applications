import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {homePage} from './views/home.js';
import {createPage} from './views/create.js';
import {allMemesPage} from './views/allMemes.js';
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';
import {myProfilePage} from './views/myProfile.js';
import { logout } from './api/data.js';


const main=document.querySelector('main');

page('/register',middleware,registerPage);
page('/login',middleware,loginPage);
page('/home',middleware,homePage);
page('/create',middleware,createPage);
page('/all-memes',middleware,allMemesPage);
page('/details/:id',middleware,detailsPage);
page('/edit/:id',middleware,editPage);
page('/my-profile',middleware,myProfilePage);

page.start();

setNavigationBar();

function middleware (context,next) {
    context.render = (content) => render(content,main);
    next();
}

export function setNavigationBar () {
   
    let user=[...document.querySelectorAll('.user a')];
    let guest=[...document.querySelectorAll('.guest a')];
    const token=sessionStorage.getItem('userToken');
    
    if(token===null) {
        page.redirect('/home');
        let welcome=document.querySelector('.profile span');
        welcome.textContent='';
        user.forEach(a=>a.style.display='none');
        guest.forEach(a=>a.style.display='block');
    } else {
        page.redirect('/all-memes');
        let welcome=document.querySelector('.profile span');
        welcome.textContent='Welcome, ' +sessionStorage.getItem('email');
        user.forEach(a=>a.style.display='block');
        guest.forEach(a=>a.style.display='none');
    }
}

document.querySelector('.profile').lastElementChild.addEventListener('click', async function onClick (event) {
    await logout();
    setNavigationBar();
    page.redirect('/home');
})
import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import { logout } from './api/data.js';
import { catalogPage } from './views/catalog.js';
import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';


const main=document.querySelector('main');

page('/register',middleware,registerPage);
page('/login',middleware,loginPage);
page('/catalog',middleware,catalogPage);
page('/',middleware,homePage);
page('/create',middleware,createPage);
page('/details/:id',middleware,detailsPage);
page('/edit/:id',middleware,editPage);
page('/search',middleware,searchPage);


page.start();

setNavigationBar();

function middleware (context,next) {
    context.render = (content) => render(content,main);
    next();
}

export function setNavigationBar () {
   
    let user=document.querySelector('#user');
    let guest=document.querySelector('#guest');
    const token=sessionStorage.getItem('userToken');
    
    if(token===null) {
        user.style.display='none';
        guest.style.display='block';
    } else {
        user.style.display='block';
        guest.style.display='none';
    }
}

document.querySelector('#logoutBtn').addEventListener('click', async function onClick (event) {
    await logout();
    setNavigationBar();
    page.redirect('/');
})
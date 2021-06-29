import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {homePage} from './views/home.js';
import {logout} from './api/data.js'
import { allListingsPage } from './views/allListings.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myListingsPage } from './views/myListings.js';
import { searchPage } from './views/search.js';


const main=document.querySelector('main');

page('/register',middleware,registerPage);
page('/login',middleware,loginPage);
page('/',middleware,homePage);
page('/all-listings',middleware,allListingsPage);
page('/create',middleware,createPage);
page('/details/:id',middleware,detailsPage);
page('/edit/:id',middleware,editPage);
page('/my-listings',middleware,myListingsPage);
page('/search',middleware,searchPage);


page.start();

setNavigationBar();

function middleware (context,next) {
    context.render = (content) => render(content,main);
    next();
}

export function setNavigationBar () {
   
    let user=document.querySelector('#profile');
    let guest=document.querySelector('#guest');
    const token=sessionStorage.getItem('userToken');
    
    if(token===null) {
        user.style.display='none';
        guest.style.display='block';
    } else {
        let welcome=user.querySelector('a');
        welcome.textContent='Welcome ' +sessionStorage.getItem('username');
        user.style.display='block';
        guest.style.display='none';
    }
}

document.querySelector('#profile').lastElementChild.addEventListener('click', async function onClick (event) {
    await logout();
    setNavigationBar();
    page.redirect('/');
})
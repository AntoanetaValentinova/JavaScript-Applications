import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { registerPage } from '../src/views/register.js';
import { loginPage } from '../src/views/login.js';
import { homePage } from '../src/views/home.js';
import { browsePage } from '../src/views/browse.js';
import { createPage } from '../src/views/create.js';
import { logout } from '../src/api/data.js';
import { detailsPage } from '../src/views/details.js';
import { editPage } from '../src/views/edit.js';
import { myTeamsPage } from '../src/views/myTeams.js';

const main = document.querySelector('main');
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);
page('/', middleware, homePage);
page('/browse', middleware, browsePage);
page('/create', middleware, createPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/my-teams', middleware, myTeamsPage);
page.start();

async function middleware(context, next) {
    context.render = (content) => render(content, main);
    next();
}

setNavigationBar();

//set navigation bar
export function setNavigationBar() {
    const token = sessionStorage.getItem('userToken');
    const guestButtons = [...document.querySelectorAll('nav>a.guest')];
    const userButtons = [...document.querySelectorAll('nav>a.user')];
    if (token !== null) {
        guestButtons.forEach(b => b.style.display = 'none');
        userButtons.forEach(b => b.style.display = 'block');
    } else {
        guestButtons.forEach(b => b.style.display = 'block');
        userButtons.forEach(b => b.style.display = 'none');
    }
}

//logout
document.querySelector('#logout').addEventListener('click', async function onClick() {
    await logout();
    setNavigationBar();
    page.redirect('/');
})
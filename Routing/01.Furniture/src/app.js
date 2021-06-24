import {showDashboardPage} from './views/dashboard.js'
import {showRegisterPage} from './views/register.js'
import {showLoginPage} from './views/login.js'
import {showCreatePage} from './views/create.js'
import {showDetailsPage} from './views/details.js'
import {showEditPage} from './views/edit.js'
import {showMyFurniturePage} from './views/myFurniture.js'
import {logout} from './logout.js'
import page from '../node_modules/page/page.mjs'
import {getUserToken} from '../src/sessionStorage.js'
import { render } from '../node_modules/lit-html/lit-html.js'

const main=document.querySelector('.container');

page('/',middleware,showDashboardPage);
page('/register',middleware,showRegisterPage);
page('/login',middleware,showLoginPage);
page('/create',middleware,showCreatePage);
page('/details/:id',middleware,showDetailsPage);
page('/edit/:id',middleware,showEditPage);
page('/my-furnitures',middleware,showMyFurniturePage);

function middleware(context,next) {
    context.render = (content)=> render(content,main);
    next();
}
setNavigationBar();
page.start();

export function setNavigationBar () {
    let user=document.querySelector('#user');
    let guest=document.querySelector('#guest');

    if(getUserToken()!==null) {
        user.style.display='inline-block';
        guest.style.display='none';
    } else {
        user.style.display='none';
        guest.style.display='inline-block';
        console.log(user,guest)
    }
}

// addEvetListener on logout button
document.querySelector('#logoutBtn').addEventListener('click',logout);
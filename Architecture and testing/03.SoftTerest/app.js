import { setupHome, showHome } from './home.js'
import { setupLogin, showLogin } from './login.js'
import { setupRegister, showRegister } from './register.js'
import { setupDashboard, showDashboard } from './dashboard.js'
import { setupDetails, showDetails } from './details.js'
import { setupCreate, showCreate } from './create.js'
import { logout } from './logout.js'

//sections
const main = document.querySelector('main');
const homeSection = document.querySelector('#home');
const loginSection = document.querySelector('#login');
const registerSection = document.querySelector('#register');
const dashboardSection = document.querySelector('#dashboard-holder');
const detailsSection = document.querySelector('#details');
const createSection = document.querySelector('#create');

//navigation links
const dashboardLi = document.querySelector('#dashboard-li');
const createLi = document.querySelector('#create-li');
const logoutLi = document.querySelector('#logout-li');
const loginLi = document.querySelector('#login-li');
const registerLi = document.querySelector('#register-li');

function start() {
    setupAllViews();
    showHome();
    setupNavigation();
    addEventListenersToNavigation();
}

function setupAllViews() {
    setupHome(main, homeSection);
    setupLogin(main, loginSection);
    setupRegister(main, registerSection);
    setupDashboard(main, dashboardSection);
    setupDetails(main, detailsSection);
    setupCreate(main, createSection);
}

export function setupNavigation() {
    const token = sessionStorage.getItem('userToken');
    if (token === null) {
        dashboardLi.style.display = 'inline-block';
        loginLi.style.display = 'inline-block';
        registerLi.style.display = 'inline-block';
        createLi.style.display = 'none';
        logoutLi.style.display = 'none';
    } else {
        dashboardLi.style.display = 'inline-block';
        loginLi.style.display = 'none';
        registerLi.style.display = 'none';
        createLi.style.display = 'inline-block';
        logoutLi.style.display = 'inline-block';
    }
}

function addEventListenersToNavigation() {
    registerLi.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault();
        showRegister()
    });
    loginLi.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault();
        showLogin()
    });
    logoutLi.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault();
        logout()
    });
    dashboardLi.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault();
        showDashboard()
    });
    createLi.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault();
        showCreate()
    });
}
start();


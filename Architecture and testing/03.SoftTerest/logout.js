import { get } from "./api.js";
import {setupNavigation} from './app.js';


export async function logout() {
    //make request
    get('http://localhost:3030/users/logout');

    //manage session storage
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');

    // show right nav bar
    setupNavigation();
}
import {logoutRequest} from './api.js';
import {getUserToken,clearSessionStorage} from './sessionStorage.js';
import {setNavigationBar} from './app.js';

export async function logout() {
    if (getUserToken()!==null) {
        logoutRequest();
        clearSessionStorage();
        setNavigationBar();
    }
}
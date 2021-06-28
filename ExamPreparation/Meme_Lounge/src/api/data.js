import {get,post,postAuth,put,del,getLogout} from './api.js';

const host='http://localhost:3030';

export async function deleteMeme (id) {
    const result= await del(host+'/data/memes/'+id);
    return result;
}

export async function editMeme (id,title,description,imageUrl) {
    const result= await put(host+'/data/memes/'+id,{title,description,imageUrl});
    return result;
}

export async function createMeme (title,description,imageUrl) {
    const result= await postAuth(host+'/data/memes',{title,description,imageUrl});
    return result;
}

export async function getMyMemes (id) {
    const result= await get(host+`/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
    return result;
}

export async function getMemeById (id) {
    const result= await get(host+'/data/memes/'+id);
    return result;
}


export async function getAllMemes () {
    const result= await get(host+'/data/memes?sortBy=_createdOn%20desc');
    return result;
}

export async function register (username,email,password,gender) {
    //make request
    const result= await post(host+'/users/register', {username,email,password,gender});
    
    //save user details in session storgae
    sessionStorage.setItem('userToken',result.accessToken);
    sessionStorage.setItem('id',result._id);
    sessionStorage.setItem('username',result.username);
    sessionStorage.setItem('gender',result.gender);
    sessionStorage.setItem('email',result.email);

    return result;
}

export async function login (email,password) {
    //make request
    const result= await post(host+'/users/login', {email,password});
    
    //save user details in session storgae
    sessionStorage.setItem('userToken',result.accessToken);
    sessionStorage.setItem('id',result._id);
    sessionStorage.setItem('username',result.username);
    sessionStorage.setItem('gender',result.gender);
    sessionStorage.setItem('email',result.email);

    return result;
}


export async function logout () {
    //make request
    const result= await getLogout(host+'/users/logout');
    
    //save user details in session storgae
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('gender');

    return result;
}


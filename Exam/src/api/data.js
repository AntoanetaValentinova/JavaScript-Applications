import {get,post,postAuth,put,del,getLogout} from './api.js';

const host='http://localhost:3030';

export async function deleteArticle (id) {
    return await del(host+'/data/wiki/'+id);
}
export async function foundedArticles (query) {
    return await get(host+`/data/wiki?where=title%20LIKE%20%22${query}%22`);
}

export async function createArticle (title,category,content) {
    return await postAuth(host+'/data/wiki',{title,category,content});
}


export async function editArticle (id,title,category,content) {
    return await put(host+'/data/wiki/'+id,{title,category,content});
}

export async function getAllArticles () {
    return await get(host+'/data/wiki?sortBy=_createdOn%20desc');
}

export async function getArticleById (id) {
    return await get(host+'/data/wiki/'+id);
}

export async function getRecentArticleForEachCategory () {
    return await get(host+'/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}


export async function register (email,password) {
    //make request
    const result= await post(host+'/users/register', {email,password});
    
    //save user details in session storgae
    sessionStorage.setItem('userToken',result.accessToken);
    sessionStorage.setItem('id',result._id);
    sessionStorage.setItem('email',result.email);

    return result;
}

export async function login (email,password) {
    //make request
    const result= await post(host+'/users/login', {email,password});
    
    //save user details in session storgae
    sessionStorage.setItem('userToken',result.accessToken);
    sessionStorage.setItem('id',result._id);
    sessionStorage.setItem('email',result.email);

    return result;
}


export async function logout () {
    //make request
    const result= await getLogout(host+'/users/logout');
    
    //save user details in session storgae
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');
    

    return result;
}


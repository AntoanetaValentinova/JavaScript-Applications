import {get,post,postAuth,put,del,getLogout} from './api.js';

const host='http://localhost:3030';

export async function delListing (id) {
    const result= await del(host+'/data/cars/'+id);
    return result;
}

export async function editListing (id,brand,model,description,year,imageUrl,price) {
    const result= await put(host+'/data/cars/'+id,{brand,model,description,year,imageUrl,price});
    return result;
}

export async function createListing (brand,model,description,year,imageUrl,price) {
    const result= await postAuth(host+'/data/cars',{brand,model,description,year,imageUrl,price});
    return result;
}
export async function getMyListings () {
    const userId=sessionStorage.getItem('id');
    const result= await get(host+`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}

export async function search (query) {
    return await get(host+`/data/cars?where=year%3D${query}`);
    
}

export async function getAllListings () {
    const result= await get(host+'/data/cars?sortBy=_createdOn%20desc');
    return result;
}

export async function getListingById (id) {
    const result= await get(host+'/data/cars/'+id);
    return result;
}

export async function register (username,password) {
    //make request
    const result= await post(host+'/users/register', {username,password});
    
    //save user details in session storgae
    sessionStorage.setItem('userToken',result.accessToken);
    sessionStorage.setItem('id',result._id);
    sessionStorage.setItem('username',result.username);

    return result;
}

export async function login (username,password) {
    //make request
    const result= await post(host+'/users/login', {username,password});
    
    //save user details in session storgae
    sessionStorage.setItem('userToken',result.accessToken);
    sessionStorage.setItem('id',result._id);
    sessionStorage.setItem('username',result.username);

    return result;
}


export async function logout () {
    //make request
    const result= await getLogout(host+'/users/logout');
    
    //save user details in session storgae
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
 

    return result;
}


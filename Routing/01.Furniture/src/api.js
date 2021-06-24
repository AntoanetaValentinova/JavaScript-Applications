import {getUserToken} from './sessionStorage.js'


const host='http://localhost:3030'

async function getMyFurnitureRequest(userID) {
    const url=host+`/data/catalog?where=_ownerId%3D%22${userID}%22`
    return await getRequestAuth(url);
}

async function deleteFurnitureRequest(id) {
    return await deleteRequest(host+'/data/catalog/'+id);
}

async function updateFurnitureRequest(id,make,model,year,description,price,img,material) {
    let data={};
    if (material!=='') {
        data={make,model,year,description,price,img,material}
    } else {
        data={make,model,year,description,price,img}
    }
    return await putRequest(host+'/data/catalog/'+id,data);
}

async function getFurnitureDetailsRequest(id) {
    return await getRequest(host+'/data/catalog/'+id);
}

async function getAllFurnituresRequest() {
    return await getRequest(host+'/data/catalog');
}

async function createFurnitureRequest(make,model,year,description,price,img,material) {
    let data={};
    if (material!=='') {
        data={make,model,year,description,price,img,material}
    } else {
        data={make,model,year,description,price,img}
    }
    return await postAuthRequest(host+'/data/catalog',data);
}
async function logoutRequest() {
    const responce=await fetch(host+'/users/logout',{
        method:'get',
        headers:{'Content-Type': 'application/json',
        'X-Authorization':getUserToken()}
    });
    await errorHandling(responce);
}

async function registerRequest(email,password) {
    return await postRequest(host+'/users/register',email,password);
}

async function loginRequest(email,password) {
    return await postRequest(host+'/users/login',email,password);
}

async function deleteRequest(url) {
    const responce=await fetch(url,{
        method: 'delete',
        headers:{'Content-Type':'application/json',
        'X-Authorization': getUserToken()},
    })
    errorHandling(responce);
    const data=await responce.json();
    return data;
}
async function putRequest(url,furniture) {
    const responce=await fetch(url,{
        method: 'put',
        headers:{'Content-Type':'application/json',
            'X-Authorization': getUserToken()
            },
        body: JSON.stringify(furniture)
    })
    errorHandling(responce);
    const data=await responce.json();
    return data;
}

async function postRequest(url,email,password) {
    const responce=await fetch(url,{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email,password})
    })

    await errorHandling(responce);
    const data=await responce.json();
 
    return data;
}

async function postAuthRequest(url,data) {
    const responce=await fetch(url,{
        method: 'post',
        headers:{'Content-Type':'application/json',
            'X-Authorization': getUserToken()
            },
        body: JSON.stringify(data)
    })
    await errorHandling(responce);
    const dataAuth=await responce.json();
    return dataAuth;
}

async function getRequest(url) {
    const responce=await fetch(url);
    await errorHandling(responce);
    const data=await responce.json();
    return data;
}

async function getRequestAuth(url) {
    const responce=await fetch(url,{
        method:'get',
        headers:{'Content-Type': 'application/json',
        'X-Authorization':getUserToken()}
    });
    await errorHandling(responce);
    const data=await responce.json();
    return data;
}

async function errorHandling(responce) {
    if(responce.ok===false) {
        const err=await responce.json();
        alert(err.message);
        throw new Error(err.message);
    }
}

export {
    deleteFurnitureRequest,
    updateFurnitureRequest,
    getFurnitureDetailsRequest,
    getAllFurnituresRequest,
    createFurnitureRequest,
    logoutRequest,
    loginRequest,
    registerRequest,
    getMyFurnitureRequest
}
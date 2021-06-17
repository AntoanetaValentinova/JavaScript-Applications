import {post,getLogout,getWithoutAuth,put,postAuth,del} from '../api/api.js';

const host='http://localhost:3030';


export async function cancelRequest (id) {
    return await del(host+'/data/members/'+id);
}

export async function approveRequest (id,status) {
    return await put(host+'/data/members/'+id,{status});
}

export async function editTeam (id,name,logoUrl,description) {
    return await put(host+'/data/teams/'+id,{name,logoUrl,description});
}

export async function pendingRequestToJoinATeam (teamId) {
    return await postAuth(host+'/data/members/',{teamId});
}

export async function createNewTeam (name, logoUrl, description) {
    return await postAuth(host+'/data/teams',{name,logoUrl,description});
}

export async function getMembersForTeam (id) {
    return await getWithoutAuth(host+`/data/members?where=teamId%3D%22${id}%22&load=user%3D_ownerId%3Ausers`);
}

export async function getTeamByID (id) {
    return await getWithoutAuth(host+'/data/teams/'+id);
}

export async function getAllTeams () {
    return await getWithoutAuth(host+'/data/teams');
}

export async function getMyTeams (id) {
    return await getWithoutAuth(host+`/data/members?where=_ownerId%3D%22${id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
}

export async function getAllMembers () {
    return await getWithoutAuth(host+'/data/members?where=status%3D%22member%22');
}

export async function register (email,username,password) {
    //make request
    const result= await post(host+'/users/register', {email,username,password});
    
    //save user details in session storgae
    sessionStorage.setItem('userToken',result.accessToken);
    sessionStorage.setItem('id',result._id);
    sessionStorage.setItem('username',result.username);

    return result;
}

export async function login (email,password) {
    //make request
    const result= await post(host+'/users/login', {email,password});
    
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


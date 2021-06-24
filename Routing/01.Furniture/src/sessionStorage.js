function getUserToken () {
    const token=sessionStorage.getItem('userToken');
    return token;
}

function getId () {
    const id=sessionStorage.getItem('id');
    return id;
}

function setSessionStorage(user) {
    sessionStorage.setItem('userToken',user.accessToken);
    sessionStorage.setItem('id',user._id);
    sessionStorage.setItem('email',user.email);
}
function clearSessionStorage(user) {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');
}

export {
    getUserToken,
    setSessionStorage,
    clearSessionStorage,
    getId
}
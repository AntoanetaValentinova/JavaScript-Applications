export async function post(url, body) {
    try {
        const responce = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        await errorHandling(responce);
        const data = await responce.json();
        return data;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export async function postAuth(url, body) {
    const token = sessionStorage.getItem('userToken');
    try {
        const responce = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(body)
        })
        await errorHandling(responce);
        const data = await responce.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export async function del(url) {
    const token = sessionStorage.getItem('userToken');
        const responce = await fetch(url, {
            method: 'delete',
            headers: {
                'X-Authorization': token
            },
        })
        await errorHandling(responce);
}

export async function put(url, body) {
    const token = sessionStorage.getItem('userToken');
    try {
        const responce = await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(body)
        })
        await errorHandling(responce);
        const data = await responce.json();
        return data;
    } catch (err) {
        throw err;
    }
}


export async function get(url) {
    try {
        const responce = await fetch(url)
        await errorHandling(responce);
        const data = await responce.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export async function getLogout(url) {
    const token = sessionStorage.getItem('userToken');
    try {
        const responce = await fetch(url, {
            method: 'get',
            headers: { 'X-Authorization': token },
        })
        await errorHandling(responce);
    } catch (err) {
        throw err;
    }
}

async function errorHandling(responce) {
    if (responce.ok === false) {
        const err = await responce.json();
        throw new Error(err.message);
    }
}

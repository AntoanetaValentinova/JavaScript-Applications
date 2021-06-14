
export async function get (url) {
    const responce=await fetch(url);
    errorHandlig(responce);
    const data=await responce.json();
    return data;
}


export async function deletee (url) {
    const responce=await fetch(url,{
        method:'delete',
        headers:{
        'X-Authorization':sessionStorage.getItem('userToken')   
        },
    });
    errorHandlig(responce);
    const data=await responce.json();
    return data;
}


export async function post (url,body) {
    const responce=await fetch(url,{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body)
    });
    errorHandlig(responce);
    const data=await responce.json();
    return data;
}

export async function postAuth (url,body) {
    const responce=await fetch(url,{
        method: 'post',
        headers:{'Content-Type':'application/json',
        'X-Authorization':sessionStorage.getItem('userToken')   
        },
        body: JSON.stringify(body)
    });
    errorHandlig(responce);
    const data=await responce.json();
    return data;
}

async function errorHandlig (responce) {
    if (responce.ok===false) {
        let error=await responce.json();
        alert(error.message)
        throw new Error(error.message);
    }
}
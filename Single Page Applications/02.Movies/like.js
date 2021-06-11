let eventTarget;
export async function likeMovie(eventT) {
    eventTarget=eventT;

    const url='http://localhost:3030/data/likes';
    const responce=await fetch(url,{
        method:'post',
        headers: {
            'Content-Type':'application/json',
            'X-Authorization':sessionStorage.getItem('userToken')
        },
        body: JSON.stringify({movieId: eventTarget.parentNode.parentNode.id})
    })

    if (responce.ok) {
        eventTarget.style.display='none';
        let span=eventTarget.parentNode.querySelector('span');
        span.style.display='inline-block';
        const likes=await getMovieLikes(eventTarget.parentNode.parentNode.id);
        span.textContent=`Liked `+  likes;
    } else {
        const error=await responce.json();
        return alert (error.message);
    }
}


export async function getMovieLikes(id) {
    let url=`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
    const responce=await fetch(url);
    const data=await responce.json();
    return data;
}

export async function getOwnLikes(id) {
    const userId=sessionStorage.getItem('id');
    let url=`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22 `
    const responce=await fetch(url);
    const data= await responce.json();
    return data;
}
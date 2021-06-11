import {startView} from './app.js'

export async function deleteMovie (eventTarget) {
    const idMovie=eventTarget.parentNode.parentNode.id;
    const ownerId=eventTarget.parentNode.id;
    const token=sessionStorage.getItem('userToken');
    const owner=sessionStorage.getItem('id');

    if (owner===ownerId) {
        let url='http://localhost:3030/data/movies/'+idMovie;
        const responce=await fetch(url, {
            method: 'delete',
            headers: {
                'X-Authorization':token
            }
        })
        if(responce.ok===false) {
            const err=await responce.json();
            return alert(err.message);
        }
        startView();
    }
   
}
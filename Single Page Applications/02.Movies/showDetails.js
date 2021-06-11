import { hideStartView } from './app.js'
import { deleteMovie } from './delete.js'
import { editMovie } from './edit.js'
import { likeMovie, getMovieLikes,getOwnLikes} from './like.js'


let section;


export function setupDetails(sectionTarget) {
    section = sectionTarget;
    const buttons = [...section.querySelectorAll('a')];
    const deleteBtn = buttons[0].addEventListener('click', (event) => deleteMovie(event.target))
    const editBtn = buttons[1].addEventListener('click', (event) => editMovie(event.target))
    const likeBtn = buttons[2].addEventListener('click', (event) => likeMovie(event.target))
}

export async function showDetailsMovie(title, description, img, ownerId, id) {
    hideStartView();
    section.style.display = 'block';
    const idSession = sessionStorage.getItem('id');

    //create card
    const mainDiv = section.querySelector('.row.bg-light.text-dark');
    mainDiv.setAttribute('id', id);
    const parentButton = section.querySelector('.col-md-4.text-center');
    parentButton.setAttribute('id', ownerId);
    const h1 = section.querySelector('h1');
    h1.textContent = `Movie title: ${title}`;
    const imgEl = section.querySelector('img');
    imgEl.setAttribute('src', img);
    const p = section.querySelector('p');
    p.textContent = description;
    const aDelete = section.querySelector('a[class="btn btn-danger"]');
    const aEdit = section.querySelector('a[class="btn btn-warning"]');
    const aLike = section.querySelector('a[class="btn btn-primary"]');
    const span = section.querySelector('span');
    
   
    //show right buttons
    const ownLike=await getOwnLikes(id);
    const likes=await getMovieLikes(id);
    console.log(ownLike,likes,id)
    span.textContent='Liked '+likes;
    if (sessionStorage.getItem('userToken') !== null) {
        if (ownerId === idSession) {
            aDelete.style.display = 'inline-block';
            aEdit.style.display = 'inline-block';
            aLike.style.display = 'none';
            span.style.display = 'inline-block';
        } else {
            aDelete.style.display = 'none';
            aEdit.style.display = 'none';
            aLike.style.display = 'inline-block';
            span.style.display = 'none';
            if (ownLike.length!==0) {
                aLike.style.display = 'none';
                span.style.display = 'inline-block';
            }
        }
    } else {
        aDelete.style.display = 'none';
        aEdit.style.display = 'none';
        aLike.style.display = 'none';
        span.style.display = 'inline-block';
    }
}
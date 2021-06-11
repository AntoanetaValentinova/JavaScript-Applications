import { hideStartView } from './app.js'
import { showDetailsMovie } from './showDetails.js'

let section;
export function setupEdit(sectionTarget) {
    section = sectionTarget;
}

export function editMovie(eventTarget) {
        hideStartView();
        section.style.display = 'block';
        const movie=eventTarget.parentNode.parentNode;
        let titleMovie=movie.querySelector('h1').textContent;
        titleMovie=titleMovie.substring(13,titleMovie.length);
        const descriptionMovie=movie.querySelector('p').textContent;
        const imgMovie=movie.querySelector('img').src;

        section.querySelector('input[name="title"]').value = titleMovie;
        section.querySelector('textarea[name="description"]').textContent = descriptionMovie;
        section.querySelector('input[name="imageUrl"]').value = imgMovie;
        section.querySelector('form').addEventListener('submit', edit)
    
        const form=section.querySelector('form');
        form.addEventListener('submit',edit);

        async function edit(e) {
            e.preventDefault();
            const idMovie=movie.id;
            const token = sessionStorage.getItem('userToken');
            const ownerId = sessionStorage.getItem('id');
            const form = section.querySelector('form');
            const formData = new FormData(form)
            const titleEdited = formData.get('title');
            const descriptionEdited = formData.get('description');
            const imageUrlEdited = formData.get('imageUrl');
            console.log(titleEdited,descriptionEdited,imageUrlEdited)
            const url = 'http://localhost:3030/data/movies/' + idMovie;
            const responce = await fetch(url, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify({
                    _ownerId: ownerId,
                    title: titleEdited,
                    description: descriptionEdited,
                    img: imageUrlEdited
                })
            })
            if (responce.ok === false) {
                const err = await responce.json();
                return alert(err.message);
            }
            showDetailsMovie(titleEdited,descriptionEdited,imageUrlEdited,ownerId,idMovie);
            form.reset();
        }
  
}


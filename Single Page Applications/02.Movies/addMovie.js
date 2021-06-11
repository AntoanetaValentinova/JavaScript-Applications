import { hideStartView, startView } from './app.js';
import { showDetailsMovie } from './showDetails.js';

let section;

export async function loadAllMovies() {
    document.querySelector('.card-deck').innerHTML = '';
    const responce = await fetch('http://localhost:3030/data/movies');
    if (responce.ok === false) {
        const error = await responce.json();
        return alert(error.message);
    }
    const data = await responce.json();
    data.forEach(r => { createNewMovieElementDom(r.title, r.description, r.img, r._ownerId, r._id) })
}

export function setupAddMovie(addMovieSection, addMovieButton) {
    section = addMovieSection;
    addMovieButton.querySelector('a').addEventListener('click', showAddMoviePage);
}

function showAddMoviePage() {
    hideStartView();
    section.style.display = 'block';
    section.querySelector('form').addEventListener('submit', addMovie)
}

async function addMovie(e) {
    e.preventDefault();
    const form = section.querySelector('form');
    let formData = new FormData(form);
    const titleName = formData.get('title');
    const descriptionData = formData.get('description');
    const imageUrl = formData.get('imageUrl');
    if (titleName.trim() === '' || descriptionData.trim() === '' || imageUrl.trim() === '') {
        return alert('All fields are required!')
    }

    const token = sessionStorage.getItem('userToken');
    const creatorId = sessionStorage.getItem('id');

    if (token !== null) {
        const responce = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                _ownerId: creatorId,
                title: titleName,
                description: descriptionData,
                img: imageUrl
            })
        })

        if (responce.ok === false) {
            const error = await responce.json();
            return alert(error.message);
        }

        const data = await responce.json();
        const idMovie = data._id;
        createNewMovieElementDom(titleName, descriptionData, imageUrl, creatorId, idMovie);
        startView();
    }
}

function createNewMovieElementDom(title, description, img, creatorId, idMovie) {
    const div = document.querySelector('.card-deck');
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-info');
    button.textContent = 'Details';
    button.addEventListener('click', () => {showDetailsMovie(title, description, img, creatorId, idMovie)})

    let result = newElement('div', '', { class: "card mb-4", id:idMovie },
        newElement('img', '', { class: "card-img-top", src: img, alt: "Card image cap", width: "400" }),
        newElement('div', '', { class: "card-body" }, newElement('h4', title, { class: "card-title" })),
        newElement('div', '', { class: "card-footer" }, newElement('a', '', {}, button))
    )

    div.appendChild(result);
}


export function newElement(type, text, attr, ...children) {
    let element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    if (attr) {
        Object.entries(attr).forEach(atr => {
            element.setAttribute(atr[0], atr[1]);
        })
    }
    if (children) {
        children.forEach(c => element.appendChild(c));
    }

    return element;
}


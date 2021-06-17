import {render,html} from './node_modules/lit-html/lit-html.js';

document.querySelector('#btnLoadTowns').addEventListener('click',loadTowns);

function loadTowns(event) {
    event.preventDefault();
    const container=document.querySelector('#root');
    
    const listOfElements = (data) => html`
        <ul>
            ${data.map(t=>html`<li>${t}</li>`)};
        </ul>
    `;
    const towns=document.getElementById('towns').value.split(', ');
    const ul=listOfElements(towns);
    render(ul,container);
}


import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from './catSeeder.js';


const container = document.getElementById('allCats');

const createCatCard = (data) => html`
    <ul>
        ${data.map(c=>html`
        <li>
            <img src="./images/${c.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${showStatusCode} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${c.id}>
                    <h4>Status Code: ${c.statusCode}</h4>
                    <p>${c.statusMessage}</p>
                 </div>
             </div>
        </li>`)}
    </ul>`;

function showStatusCode(ev) {
    const divStatusInfo=ev.target.parentNode.querySelector('.status');

    if (divStatusInfo.style.display==='none') {
        divStatusInfo.style.display='block';
    } else {
        divStatusInfo.style.display='none'
    }
}

const result=createCatCard(cats);
render(result,container);
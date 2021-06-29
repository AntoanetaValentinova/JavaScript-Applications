import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';


const searchPageTemplate = (cars, onClick) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onClick} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${cars.length > 0 ? html`${cars.map(listingTemplate)}` : html`<p class="no-cars"> No results.</p>`}

    </div>
</section>`;

const listingTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function searchPage(context) {
    const query = context.querystring.split("=")[1];
    let cars = [];
    if (Number(query) !== NaN&&query) {
        cars = await search(Number(query));
        context.render(searchPageTemplate(cars, onClick));
    }
    context.render(searchPageTemplate(cars, onClick));


    async function onClick() {
        context.page.redirect(`/search?query=${document.querySelector('#search-input').value}`);

    }
}
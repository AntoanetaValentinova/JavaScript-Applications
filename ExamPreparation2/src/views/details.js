import { html } from '../../node_modules/lit-html/lit-html.js';
import { delListing, getListingById } from '../api/data.js';


const detailsPageTemplate = (car,deleteListing) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${car._ownerId===sessionStorage.getItem('id') ? html` <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${deleteListing} href="javascript:void(0)" class="button-list">Delete</a>
        </div>` : ''}
    </div>
</section>`;

export async function detailsPage(context) {
    const idListing=context.params.id;
    const listing=await getListingById(idListing)

    context.render(detailsPageTemplate(listing,deleteListing));

    async function deleteListing() {
        let confirmed=confirm('Are you sure you want to delete this listing?');
        if(confirmed) {
            await delListing(idListing);
            context.page.redirect('/all-listings')
        }
    }
    
}
import { html } from "../../node_modules/lit-html/lit-html.js"
import {getAllFurnituresRequest} from '../api.js'


const templatePage = (allFurnitures) => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${allFurnitures.map(furnitureTemplate)};
    </div>
</div>`;

const furnitureTemplate = (furniture) => html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${furniture.img} />
                        <p>${furniture.description}</p>
                        <footer>
                            <p>Price: <span>${furniture.price} $</span></p>
                        </footer>
                        <div>
                            <a href="/details/${furniture._id}" class="btn btn-info">Details</a>
                        </div>
                    </div>
                </div>
            </div>`;


export async function showDashboardPage(context) {
    const allFurnitures=await getAllFurnituresRequest();
    context.render(templatePage(allFurnitures));
}
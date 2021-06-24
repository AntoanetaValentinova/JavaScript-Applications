import { html } from "../../node_modules/lit-html/lit-html.js";
import { styleMap } from "../../node_modules/lit-html/directives/style-map.js";
import {getFurnitureDetailsRequest,deleteFurnitureRequest} from '../api.js'
import { getId, getUserToken } from "../sessionStorage.js";

const detailsPageTemplate = (furniture,isOwner,deleteFurniture,editFurniture) => html` 
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="furniture.img" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material ? `${furniture.material}` : ''}</span></p>
        <div>
            <a @click=${editFurniture} class="btn btn-info" style=${styleMap(isOwner? {'display':'inline-block'} : {'display':'none'})}>Edit</a>
            <a @click=${deleteFurniture} class="btn btn-red" style=${styleMap(isOwner? {'display':'inline-block'} : {'display':'none'})}>Delete</a>
        </div>
    </div>
</div>`;

export async function showDetailsPage(context) {
    const idFurniture = context.params.id;
    const furniture= await getFurnitureDetailsRequest(idFurniture);
    let isOwner=false;
    
    if (furniture._ownerId===getId()) {
        isOwner=true;
    }
    context.render(detailsPageTemplate(furniture,isOwner,deleteFurniture,editFurniture));

    async function deleteFurniture(ev) {
        const confirmed=confirm('Are you sure you want to delete this furniture?');
        if (confirmed) {
            await deleteFurnitureRequest(idFurniture);
            context.page.redirect('/');
        }
    }
    async function editFurniture(ev) {
        context.page.redirect('/edit/'+idFurniture);
    }
    
}
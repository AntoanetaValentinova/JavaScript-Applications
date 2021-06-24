import { html } from "../../node_modules/lit-html/lit-html.js";
import {createFurnitureRequest} from '../api.js'


const createPageTemplate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control valid" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
`

export async function showCreatePage(context) {   
    context.render(createPageTemplate(onSubmit));

    async function onSubmit (event) {
        event.preventDefault();
        const formData=new FormData(event.target);
        const make=formData.get('make').trim();
        const model=formData.get('model').trim();
        const year=Number(formData.get('year').trim());
        const description=formData.get('description').trim();
        const price=Number(formData.get('price').trim());
        const img=formData.get('img').trim();
        const material=formData.get('material').trim();
        if (make.length<3) {
            return alert('Make input must be at leat 4 symbols long!')
        }
        if (model.length<3) {
            return alert('Model input must be at leat 4 symbols long!')
        }
        if (year<1950||year>2050) {
            return alert('Year must be between 1950 and 2050')
        }
        if (description.length<9) {
            return alert('Description must be more than 10 symbols!')
        }
        if (!price||price<0) {
            return alert('Price must be a positive number!')
        }
        if (img==='') {
            return alert('Image URL is required!')
        }
        const createdFurniture=await createFurnitureRequest(make,model,year,description,price,img,material);
        context.page.redirect('/');
    }
}
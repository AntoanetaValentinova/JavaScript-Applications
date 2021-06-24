
import { html } from "../../node_modules/lit-html/lit-html.js";
import {updateFurnitureRequest,getFurnitureDetailsRequest} from '../api.js'

const editFurnitureTemplate = (furniture,onSubmit,valid) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control "} id="new-make" type="text" name="make" .value=${furniture.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" .value=${furniture.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" .value=${furniture.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description" .value=${furniture.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" .value=${furniture.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" .value=${furniture.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${furniture.material ? furniture.material : ''}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

export async function showEditPage(context) {
    const idFurniture = context.params.id;
    const furniture=await getFurnitureDetailsRequest(idFurniture);
    const valid={
      make:true
    }
    context.render(editFurnitureTemplate(furniture,onSubmit,{}));
   

   async  function  onSubmit (ev) {
       ev.preventDefault();
       const formData=new FormData(ev.target);
       const make=formData.get('make').trim();
       const model=formData.get('model').trim();
       const year=Number(formData.get('year').trim());
       const description=formData.get('description').trim();
       const price=Number(formData.get('price').trim());
       const img=formData.get('img').trim();
       const material=formData.get('material').trim();
       if (make.length<3) {
           valid.make=false;
           console.log(valid)
            alert('Make input must be at leat 4 symbols long!')
       } else {
           valid.make=true;
       }
       if (model.length<3) {
            alert('Model input must be at leat 4 symbols long!')
       }
       if (year<1950||year>2050) {
            alert('Year must be between 1950 and 2050')
       }
       if (description.length<9) {
            alert('Description must be more than 10 symbols!')
       }
       if (!price||price<0) {
            alert('Price must be a positive number!')
       }
       if (img==='') {
            alert('Image URL is required!')
       }
       if(Object.values(valid).includes(false)) {
           console.log('here')
           valid={};
           return context.render(editFurnitureTemplate(furniture,onSubmit,valid))
       }
       const updatedFurniture=await updateFurnitureRequest(idFurniture,make,model,year,description,price,img,material);
        context.page.redirect('/');
   }
}
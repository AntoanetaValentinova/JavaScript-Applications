import { html } from '../../node_modules/lit-html/lit-html.js'
import {approveRequest, createNewTeam,pendingRequestToJoinATeam} from '../api/data.js';

const createPageTemplate = (onSubmit,errorMessage) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
            ${errorMessage ? html`<div class="error">${errorMessage}</div>` : html``}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`;

export async function createPage(context) {
    context.render(createPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        //get form data
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const logoUrl = formData.get('logoUrl');
        const description = formData.get('description');


        let errorMessage = '';
        //validations
        if (name === '' || name.length < 4) {
            errorMessage = 'Team name must be at least 4 characters long!';
        } else if (logoUrl === '') {
            errorMessage = 'Logo Url is required!';
        } else if (description === '' || description.length < 10) {
            errorMessage = 'Description must be at least 10 characters long!';
        }

        //render page again if any of input fields are incorrect
        if (errorMessage !== '') {
            context.render(createPageTemplate(onSubmit, errorMessage));
        } else {
            try {
                const newTeam = await createNewTeam(name, logoUrl, description);
                const teamId=newTeam._id;
                const pendingRequest= await pendingRequestToJoinATeam(teamId);
                const userId= pendingRequest._id;
                const approved= await approveRequest(userId,'member');
                context.page.redirect(`/details/${newTeam._id}`);
            } catch (err) {
                //render page again if there is an error with the request
                errorMessage = err.message;
                context.render(createPageTemplate(onSubmit, errorMessage));
                throw err;
            }
            //if creation was successful redirect to newly created team deatils page
            
        }

    }
}
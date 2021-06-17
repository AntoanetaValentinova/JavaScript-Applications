import { html } from '../../node_modules/lit-html/lit-html.js';
import { getTeamByID, editTeam } from '../api/data.js';

const editPageTemplate = (team, onSubmit, errorMessage) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
            ${errorMessage ? html`<div class="error">${errorMessage}</div>` : html``}
            <label>Team name: <input type="text" name="name" .value=${team.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
            <label>Description: <textarea name="description" .value=${team.description}></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export async function editPage(context) {
    const idTeam = context.params.id;
    const teamToEdit = await getTeamByID(idTeam);
    context.render(editPageTemplate(teamToEdit,onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
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
            context.render(editPageTemplate(teamToEdit, onSubmit, errorMessage));
        } else {
            try {
                const editedTeam = await editTeam(idTeam,name, logoUrl, description);
                context.page.redirect(`/details/${editedTeam._id}`);
            } catch (err) {
                //render page again if there is an error with the request
                errorMessage = err.message;
                context.render(editPageTemplate(teamToEdit ,onSubmit, errorMessage));
                throw err;
            }

        }
    }
}
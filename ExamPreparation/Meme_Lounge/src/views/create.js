import { html } from '../../node_modules/lit-html/lit-html.js';
import { createMeme } from '../api/data.js';
import { notify } from '../notify.js';

const createPageTemplate = (onSubmit) => html`
      <section id="create-meme">
        <form @submit=${onSubmit} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>`;

export async function createPage(context) {
    context.render(createPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        if (title.trim()===''||description.trim()==''||imageUrl.trim()=='') {
            return notify('All fields are required!');
        }
        try {
            const newlyCreatedMeme = await createMeme(title, description, imageUrl);
            context.page.redirect('/all-memes');
        } catch (err) {
            notify (err.message)
        }
       
    }
}
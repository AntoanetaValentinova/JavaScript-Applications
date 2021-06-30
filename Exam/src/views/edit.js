import { html } from '../../node_modules/lit-html/lit-html.js';
import { editArticle, getArticleById } from '../api/data.js';


const editPageTemplate = (article,onSubmit) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" .value=${article.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${article.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;

export async function editPage(context) {
    const idArticle=context.params.id;
    const article=await getArticleById(idArticle);
    context.render(editPageTemplate(article,onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const category = formData.get('category').trim();
        const content = formData.get('content').trim();
        if (title === '' || category == '' || content == '') {
            return alert('All fields are required!');
        }
        if (category !== 'JavaScript' && category !== 'C#' && category !== 'Java' && category !== 'Python') {
            return alert('Category must be one of "JavaScript", "C#", "Java", or "Python"!');
        }
        const editedArticle = await editArticle(idArticle,title,category,content);
        context.page.redirect(`/details/${idArticle}`);
    }

}
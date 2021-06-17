import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteArticle, getArticleById } from '../api/data.js';


const detailsPageTemplate = (article,onClick) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">
            ${article._ownerId===sessionStorage.getItem('id') ? html`
                <a @click=${onClick} href="javascript:void(0)" class="btn delete">Delete</a>
                <a href="/edit/${article._id}" class="btn edit">Edit</a>` 
                : ''}
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>`;

export async function detailsPage(context) {
    const articleId=context.params.id;
    const  article=await getArticleById(articleId);
    context.render(detailsPageTemplate(article,onClick));

    async function onClick () {
        const confirmed=confirm('Are you sure you want to delete this article?')
        if (confirmed) {
            await deleteArticle(articleId);
            context.page.redirect('/');
        }
    }

}
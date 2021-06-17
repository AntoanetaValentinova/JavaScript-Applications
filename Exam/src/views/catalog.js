import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../api/data.js';


const catalogPageTemplate = (allArticles) => html`
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
    
        ${allArticles.length>0 ? html`${allArticles.map(articleTemplate)}` : html`<h3 class="no-articles">No articles yet</h3>`}
        
    </section>`;

const articleTemplate = (article) => html`
    <a class="article-preview" href="/details/${article._id}">
        <article>
            <h3>Topic: <span>${article.title}</span></h3>
            <p>Category: <span>${article.category}</span></p>
        </article>
    </a>`;

export async function catalogPage(context) {
    let allArticles = await getAllArticles();
    context.render(catalogPageTemplate(allArticles));


}
import { html } from '../../node_modules/lit-html/lit-html.js';
import { foundedArticles} from '../api/data.js'


const searchPageTemplate = (articles, onClick) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form id="search-form">
        <p class="field search">
            <input id="search-input" type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        
        ${articles.length > 0 ? html`${articles.map(articleTemplate)}` : html`<h3 class="no-articles">No matching articles</h3>`}

    </div>
</section>`;

const articleTemplate = (article) => html`
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`;

export async function searchPage(context) {
    const query = context.querystring.split("=")[1];
    let articles = [];
    if (query) {
        articles = await foundedArticles(query);
        context.render(searchPageTemplate(articles,onClick));
    }
    context.render(searchPageTemplate(articles,onClick));

    async function onClick() {
        context.page.redirect(`/search?query=${document.querySelector('#search-input').value}`);

    }

}
import { html } from '../../node_modules/lit-html/lit-html.js';
import { getRecentArticleForEachCategory } from '../api/data.js';


const homePageTemplate = (jsArticle,cArticle,javaArticle,pythonArticle) => html`
    <section id="home-page" class="content">
        <h1>Recent Articles</h1>
        <section class="recent js">
            <h2>JavaScript</h2>
            ${jsArticle!==undefined ? html`${articleTemplate(jsArticle)}`:html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent csharp">
            <h2>C#</h2>
            ${cArticle!==undefined ? html`${articleTemplate(cArticle)}`:html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent java">
            <h2>Java</h2>
            ${javaArticle!==undefined ? html`${articleTemplate(javaArticle)}`:html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent python">
            <h2>Python</h2>
            ${pythonArticle!==undefined ? html`${articleTemplate(pythonArticle)}`:html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
    </section>`;

const articleTemplate = (article) => html`
<article>
    <h3>${article.title}</h3>
    <p>${article.content}</p>
    <a href="/details/${article._id}" class="btn details-btn">Details</a>
</article>`;

export async function homePage(context) {
    const recentArticles=await getRecentArticleForEachCategory();
    const jsArticle= recentArticles.find(a=>a.category==='JavaScript');
    const cArticle= recentArticles.find(a=>a.category==='C#');
    const javaArticle= recentArticles.find(a=>a.category==='Java');
    const pythonArticle= recentArticles.find(a=>a.category==='Python');
    context.render(homePageTemplate(jsArticle,cArticle,javaArticle,pythonArticle));


}
import { html } from '../../node_modules/lit-html/lit-html.js'
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js'

const homePageTemplate = (stylesUser,stylesGuest) => html`
<section id="home">
    <article class="hero layout">
        <img src="./assets/team.png" class="left-col pad-med">
        <div class="pad-med tm-hero-col">
            <h2>Welcome to Team Manager!</h2>
            <p>Want to organize your peers? Create and manage a team for free.</p>
            <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
            <a style=${styleMap(stylesGuest)} href="/register" class="action cta">Sign Up Now</a>
            <a style=${styleMap(stylesUser)} href="/browse" class="action cta">Browse Teams</a>
        </div>
    </article>
</section>`;

export async function homePage (context) {
    const token=sessionStorage.getItem('userToken');
    const stylesUser = {
        display: token?'block':'none'
    }
    const stylesGuest = {
        display: token?'none':'block'
    }
    context.render(homePageTemplate(stylesUser,stylesGuest));

}

import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyMemes } from '../api/data.js'

const myProfileTemplate = (myMemes) => html`<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src=${sessionStorage.getItem('gender') === 'female'
            ? "/images/female.png" : "/images/male.png" }>
        <div class="user-content">
            <p>Username: ${sessionStorage.getItem('username')}</p>
            <p>Email: ${sessionStorage.getItem('email')}</p>
            <p>My memes count: ${myMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${myMemes.length>0 ? html`${myMemes.map(memeTemplate)}` : html`<p class="no-memes">No memes in database.</p>`}      
    </div>
</section>`;

const memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export async function myProfilePage(context) {

    const ownerId = sessionStorage.getItem('id');
    let myMemes = await getMyMemes(ownerId);
    context.render(myProfileTemplate(myMemes));
}

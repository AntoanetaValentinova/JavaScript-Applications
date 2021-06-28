import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';
import { deleteMeme ,getMemeById } from '../api/data.js';


const detailsPageTemplate = (meme,isCreator,deleteIt) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}
    
        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${meme.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                   ${meme.description}
                </p>
    
                <a style=${styleMap({display: isCreator? 'inline-block' : 'none'})} class="button warning" href="/edit/${meme._id}">Edit</a>
                <button @click=${deleteIt} style=${styleMap({display: isCreator? 'inline-block' : 'none'})} class="button danger">Delete</button>
            </div>
        </div>
    </section>`;


export async function detailsPage(context) {
    const memeId=context.params.id;
    
    const meme=await getMemeById(memeId);
    const currentUserId=sessionStorage.getItem('id');
    let isCreator=false;
    if (meme._ownerId===currentUserId) {
        isCreator=true;
    }
    context.render(detailsPageTemplate(meme,isCreator,deleteIt));

    async function deleteIt (event) {
        let confirmed = confirm('Are you sure yu want to delete this meme?');
        if(confirmed) {
            const result=await deleteMeme(memeId);
            context.page.redirect('/all-memes');
        }
    }
}
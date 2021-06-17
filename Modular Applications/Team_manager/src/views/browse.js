import { html } from '../../node_modules/lit-html/lit-html.js'
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js'
import { getAllMembers, getAllTeams } from '../api/data.js'

const browsePageTemplate = (stylesUser, allTeams) => html`
<section id="browse">
    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    <article class="layout narrow">
        <div style=${styleMap(stylesUser)} class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>
     ${allTeams.map(teamTemplate)}
</section>`;

const teamTemplate = (team) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${team.membersCount} Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`;

export async function browsePage(context) {
    const token = sessionStorage.getItem('userToken');
    const stylesUser = {
        display: token ? 'block' : 'none'
    }

    //get all teams and add to each team property membersCount starting from 0
    let allTeams = await getAllTeams();
    allTeams.map(t=>{t['membersCount']=0});

    //get all members, count members for each team and update the membersCount property
    let allMembers = await getAllMembers();
    allMembers.forEach(m=>{
        const team=allTeams.find(t=>t._id===m.teamId);
        if (team!==undefined) {
            team.membersCount+=1;
        }
    })

    context.render(browsePageTemplate(stylesUser, allTeams));
}
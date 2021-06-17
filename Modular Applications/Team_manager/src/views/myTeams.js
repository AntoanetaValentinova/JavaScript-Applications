import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyTeams ,getAllMembers} from '../api/data.js';

const myTeamsPageTemplate = (myTeams) => html`
<section id="my-teams">
    ${myTeams.length===0? html`<article class="pad-med">
        <h1>My Teams</h1>
    </article>

    <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
                team.</p>
        </div>
        <div class=""><a href="/create" class="action cta">Create Team</a></div>
    </article>` : html`${myTeams.map(t=>teamTemplate(t.team))}`}
    
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

export async function myTeamsPage(context) {
    const idUser = sessionStorage.getItem('id');
    let myTeams = await getMyTeams(idUser);
    myTeams.map(t=>{t.team['membersCount']=0});
    // myTeams.map(t=>await getTeamByID(t.teamId))
    console.log(myTeams)
    

    //get all members, count members for each team and update the membersCount property
    let allMembers = await getAllMembers();
    allMembers.forEach(m=>{
        const team=myTeams.find(t=>t.team._id===m.teamId);
        if (team!==undefined) {
            team.team.membersCount+=1;
        }
    })
    context.render(myTeamsPageTemplate(myTeams));
}
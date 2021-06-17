import { html } from '../../node_modules/lit-html/lit-html.js'
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js'
import { getTeamByID, getMembersForTeam ,pendingRequestToJoinATeam,cancelRequest,approveRequest} from '../api/data.js';

const detailsPageTemplate = (team, members, pendingRequests, token, isOwner,isMember,isPending,isNotPartOfTheTeam,joinTeam,cancel,approve,decline,leaveTeam) => html`
<section id="team-home">
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${members.length} Members</span>
            <div> 
                <a style=${styleMap({display:  isOwner? 'inline-block' : 'none'})} href="/edit/${team._id}" class="action">Edit team</a>
                <a @click=${joinTeam} style=${styleMap({display: isNotPartOfTheTeam? 'inline-block' : 'none'})} href="/details/${team._id}" class="action">Join team</a>
                <a style=${styleMap({display: isMember&&!isOwner? 'inline-block' : 'none'})} @click=${leaveTeam} href="/details/${team._id}" class="action invert">Leave team</a>
                <div style=${styleMap({display: isPending? 'inline-block' : 'none'})}>  Membership pending. <a @click=${cancel} style=${styleMap({display: isPending? 'inline-block' : 'none'})} href="/details/${team._id}">Cancel request</a></div>
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                <li style=${styleMap({display: token ? 'inline-block' : 'none'})}>My Username</li>
                ${members.map(m => memberTemplate(m,isOwner,decline,team))}
            </ul>
        </div>
        <div class="pad-large">
            <h3 style=${styleMap({display: isOwner? 'block' : 'none'})}>Membership Requests</h3>
            <ul style=${styleMap({display: isOwner? 'inline-block' : 'none'})} class="tm-members">
                ${pendingRequests.map(m => pendingTemplate(m,isOwner,approve,decline,team))}
            </ul>
        </div>
    </article>
</section>`;

const memberTemplate = (u,isOwner,decline,team) => 
html`<li>${u.user.username}
<a style=${styleMap({display: isOwner && u._ownerId!==team._ownerId? 'inline-block' : 'none'})} @click=${(event)=>decline(event,u._id)} href="/details/${team._id}" class="tm-control action">Remove from team</a>
</li>`;
const pendingTemplate = (u,isOwner, approve, decline, team) => html`
<li>${u.user.username}
<a @click=${(event)=>approve(event,u._id)} style=${styleMap({display: isOwner? 'inline-block' : 'none'})} href="/details/${team._id}" class="tm-control action">Approve</a>
<a @click=${(event)=>decline(event,u._id)} href="/details/${team._id}" class="tm-control action" >Decline</a>
</li>`;


export async function detailsPage(context) {
    let idTeam = context.params.id;
    let team = await getTeamByID(idTeam);
    let users = await getMembersForTeam(idTeam);
    let members = users.filter(u => u.status === 'member');
    let pendingRequests = users.filter(u => u.status === 'pending');

    const token = sessionStorage.getItem('userToken');
    const idCurrentUser = sessionStorage.getItem('id');

    let isOwner=false;
    let isMember=false;
    let isPending=false;
    let isNotPartOfTheTeam=false;
    let isGuest=false;
    let userIsMember=members.find(m=>m._ownerId===idCurrentUser);
    let userIsPending=pendingRequests.find(m=>m._ownerId===idCurrentUser);

    if(team._ownerId===idCurrentUser) {
        isOwner=true;
    } else if (token&&team._ownerId!==idCurrentUser) { 
        if (userIsMember!==undefined) {
            isMember=true;
        } else if (userIsPending!==undefined) {
            isPending=true;
           
        } else {
            isNotPartOfTheTeam=true;
        }
    } else if (!token) {
        isGuest=true;
    }

   
    context.render(detailsPageTemplate(team, members, pendingRequests, token,isOwner,isMember,isPending,isNotPartOfTheTeam,joinTeam,cancel,approve,decline,leaveTeam));
    async function joinTeam (event) {
        const result=await pendingRequestToJoinATeam(idTeam);
          
    }
    async function cancel(event) {
        await cancelRequest(userIsPending._id);
    }
    async function leaveTeam(event) {
        await cancelRequest(userIsMember._id);
    }
    async function approve(event,id) {
        await approveRequest(id,'member');
    }

    async function decline(event,id) {
        await cancelRequest(id);
    }

    
}
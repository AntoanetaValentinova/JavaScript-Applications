import { get } from "./api.js";
import { showDetails } from "./details.js";
import { newElement } from "./dom.js";

let main;
let section;

export function setupDashboard(mainTarget, sectionTraget) {
    main=mainTarget;
    section=sectionTraget;
}

export async function showDashboard() {
    
    main.innerHTML='';
    section.innerHTML='';
    main.appendChild(section);

    //make request to get all ideas
    const data=await get('http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');

    //manage view of the page
    if (data.length===0) {
        section.innerHTML='<h1>No ideas yet! Be the first one :)</h1>';
    } else {
        data.forEach(idea=>createIdeaCard(idea));
    }
}

function createIdeaCard(idea) {
    const detailsBtn=document.createElement('a');
    detailsBtn.textContent='Details';
    detailsBtn.classList.add('btn');
    detailsBtn.addEventListener('click',(ev)=>showDetails(idea._id))
  
    const result=newElement('div','',{ class:"card overflow-hidden current-card details", style:"width: 20rem; height: 18rem;"},
        newElement('div','',{class:"card-body"},newElement('p',idea.title,{class:"card-text"})),
        newElement('img','',{class:"card-image", src:idea.img, alt:"Card image cap"}),
        detailsBtn
    )
    section.appendChild(result);
}

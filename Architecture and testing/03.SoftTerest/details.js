import { deletee, get } from "./api.js";
import { showDashboard } from "./dashboard.js";

let main;
let section;

export function setupDetails(mainTarget, sectionTraget) {
    main=mainTarget;
    section=sectionTraget;
}

 export async function showDetails(id) {
    main.innerHTML='';
    main.appendChild(section);

    //make request for get idea by id
    let idea=await get('http://localhost:3030/data/ideas/'+id);

    //fill section with information for the current idea
    let img=section.querySelector('img');
    img.setAttribute('src',idea.img);
    let h2Title=section.querySelector('h2');
    h2Title.textContent=idea.title;
    let pDesc=section.querySelector('.idea-description');
    pDesc.textContent=idea.description;

    //check if the current user is the creator of the idea and set visability of the delete btn
    const divDeleteBtn=section.querySelector('.text-center');
    const idCurrentUser=sessionStorage.getItem('id');
    const creatorId=idea._ownerId;
    if (idCurrentUser===creatorId) {
        section.appendChild(divDeleteBtn);
        console.log(divDeleteBtn)
    } else {
        divDeleteBtn.remove();
    }

    divDeleteBtn.querySelector('a').addEventListener('click',deleteIdea)

    async function deleteIdea (ev) {
        deletee('http://localhost:3030/data/ideas/'+id);
        showDashboard();
    }
}


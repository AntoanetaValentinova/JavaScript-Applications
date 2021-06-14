import { postAuth } from "./api.js";
import { showDashboard } from "./dashboard.js";

let main;
let section;

export function setupCreate(mainTarget, sectionTraget) {
    main=mainTarget;
    section=sectionTraget;
}

export function showCreate() {
    main.innerHTML='';
    main.appendChild(section);
    document.querySelector('form').addEventListener('submit', createIdea)
}

async function createIdea(ev) {
    ev.preventDefault();

    //get form data
    const formData=new FormData(ev.target);
    const title=formData.get('title');
    const description=formData.get('description');
    const img=formData.get('imageURL');

    //validations 
    if (title.length<6) {
        alert('Title must be at least 6 characters!')
    }
    if (description.length<10) {
        alert('Description must be at least 10 characters!')
    }
    if (img.length<5) {
        alert('Image must be at least 5 characters!')
    }

    //make post request
    const createdIdea=await postAuth('http://localhost:3030/data/ideas',{title,description,img})

    //clear form
    ev.target.reset();

    //show dashboard
    showDashboard();
}

let main;
let section;

export function setupHome(mainTarget, sectionTraget) {
    main=mainTarget;
    section=sectionTraget;
}

export function showHome() {
    main.innerHTML='';
    main.appendChild(section);
}
async function solution() {
    const section=document.querySelector('#main');
    const url='http://localhost:3030/jsonstore/advanced/articles/list';
    const responce=await fetch(url);
    const data=await responce.json();
   
    data.forEach(e=>create(e));

    async function create(e) {
        let divEl=document.createElement('div');
        divEl.classList.add("accordion");
        let divEl2=document.createElement('div');
        divEl2.classList.add("head");
        let spanEl=document.createElement('span');
        spanEl.textContent=e.title;
        divEl2.appendChild(spanEl);
        let button=document.createElement('button');
        button.classList.add('button');
        button.setAttribute('id',e._id);
        button.textContent='More';
        button.addEventListener('click',onClick);
        divEl2.appendChild(button);
        divEl.appendChild(divEl2);
        let divElExtra=document.createElement('div');
        divElExtra.classList.add('extra');
        let p=document.createElement('p');
        const urlId='http://localhost:3030/jsonstore/advanced/articles/details/'+e._id;
        const responceId=await fetch (urlId);
        const dataId=await responceId.json();
        p.textContent=dataId.content;
        divElExtra.appendChild(p);
        divElExtra.style.display ='none';
        divEl.appendChild(divElExtra);
        section.appendChild(divEl);
    }
    function onClick(e) {
        const divExtra=e.target.parentNode.parentNode.lastChild;
       console.log(divExtra)
        if (divExtra.style.display==='none') {
            divExtra.style.display='inline-block';
            e.target.textContent='Less';
        } else {
            divExtra.style.display='none';
            e.target.textContent='More';
        }
    }
}

 window.addEventListener('load',solution);
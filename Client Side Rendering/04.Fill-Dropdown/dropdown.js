import {html,render} from './node_modules/lit-html/lit-html.js'

const body=document.body;

const templateArticle = (data) => html`
    <article>
        <div>
            <select id="menu">
                ${data.map(d=>html`<option value=${d._id}>${d.text}</option>`)}
            </select>
        </div>
        <form>
            <label for="itemText">
                Text:
            </label>
            <input type="text" id="itemText" />
            <input @click=${addItem} type="submit" value="Add">
        </form>
    </article>`;


function addItem(event) {
    event.preventDefault();
    const text=event.target.parentNode.querySelector('#itemText').value;
    postCity(text);
    update();
}


async function update() {
    const data=await getItems();
    const result=templateArticle(Object.values(data));
    render(result,body)
}

update();

async function getItems () {
    const responce=await fetch ('http://localhost:3030/jsonstore/advanced/dropdown');
    errorHandling(responce);
    const data=await responce.json();
    return data;
}

async function postCity (text) {
    const responce=await fetch ('http://localhost:3030/jsonstore/advanced/dropdown',{
        method:'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({text})
    });
    errorHandling(responce);
    const data=await responce.json();
    return data;
}

async function errorHandling(responce) {
    if (responce.ok===false) {
        const error=await responce.json();
        alert(error.message);
        throw new Error(error.message)
    }
}
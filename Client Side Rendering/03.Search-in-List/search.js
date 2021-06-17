import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js'



const template = (dataTowns, match) => html`
<article>
   <div id="towns">
      <ul>
         ${dataTowns.map(t => liTemplate(t, match))}
      </ul>
   </div>
   <input type="text" id="searchText" />
   <button @click=${search}>Search</button>
   <div id="result">${count(match)}</div>
</article>`;

const liTemplate = (town, match) =>
   html`<li class=${(match && town.toLowerCase().includes(match.toLowerCase())) ? 'active'  : ''}>${town}</li>`

const main = document.body;
update();

function update(match = '') {
   const result = template(towns, match);
   render(result, main);
}

function search(event) {
   const match = event.target.parentNode.querySelector('input').value;
   update(match);
}

function count(match) {
   const filteredTowns=towns.filter(town=>(match&&town.toLowerCase().includes(match.toLowerCase())));
   console.log(filteredTowns)
   if(filteredTowns.length>0) {
      return `${filteredTowns.length} matches found`;
   }
}

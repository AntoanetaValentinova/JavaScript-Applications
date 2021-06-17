import { html, render } from './node_modules/lit-html/lit-html.js'

const tbody = document.querySelector('tbody');
const searchBtn=document.querySelector('#searchBtn');
searchBtn.addEventListener('click',search)
document.querySelector('#searchBtn').addEventListener('click', search);

const templateRow = (student,select) => html`
<tr class=${select?'select':''}>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`;

//get all students 
const allStudents = await getStudents();

//start
async function start() {
   update(allStudents);
}
start();


//update all students with correct class
async function update(list,match='') {
   list=list.map(s=>templateRow(s,compare(s,match)));
   render(list, tbody);
}

function search(ev) {
  const input=document.querySelector('#searchField');
  const match=input.value.toLowerCase();
   update(allStudents,match)
   input.value='';
}

function compare(student,match) {
   return Object.values(student).some(e=>match&&e.toLowerCase().includes(match))
}


async function getStudents() {
   const responce = await fetch(' http://localhost:3030/jsonstore/advanced/table');
   if (responce.ok === false) {
      const err = await responce.json();
      alert(err.message);
      throw new Error(err.message)
   }
   let data = await responce.json();
   data=Object.values(data);
   return data;
}
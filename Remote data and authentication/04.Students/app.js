const tbody=document.querySelector('tbody');
const submit=document.querySelector('button');
submit.addEventListener('click',createNewRecord)
const url='http://localhost:3030/jsonstore/collections/students';

async function createNewRecord(e) {
    e.preventDefault();
    const form=document.querySelector('form');
    let id=form.querySelector('#id').value;
    let firstName=form.querySelector('#firstName').value;
    let lastName=form.querySelector('#lastName').value;
    let number=form.querySelector('#number').value;
    let grade=form.querySelector('#grade').value;
    await fetch(url,{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            firstName:firstName,
            lastName:lastName,
            facultyNumber:number,
            grade:grade,
            _id:id
        })
    })
    loadAllStudents();
}

async function loadAllStudents() {
    tbody.innerHTML='';
    const responce=await fetch(url);
    const data=await responce.json();
    Object.values(data).forEach(s=>createRow(s));
}


function createRow(student) {
    let tr=document.createElement('tr');
    e(student._id);
    e(student.firstName);
    e(student.lastName);
    e(student.facultyNumber);
    e(student.grade);
    tbody.appendChild(tr);

    function e(text){
        let td=document.createElement('td');
        td.textContent=text;
        tr.appendChild(td);
    }
}







loadAllStudents();
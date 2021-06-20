function attachEvents() {
    document.querySelector('#btnLoad').addEventListener('click',showPhonebook);
    document.querySelector('#btnCreate').addEventListener('click',createRecord);
    const phonebookUl=document.querySelector('#phonebook');
  
    let person=document.querySelector('#person');
    let phone=document.querySelector('#phone');
    const url='http://localhost:3030/jsonstore/phonebook';

    async function createRecord (e) {
        let personName=person.value;
        let phoneNumber=phone.value;
        await fetch(url,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                person: personName,
                phone: phoneNumber
            })
        })
        person.value='';
        phone.value='';
        showPhonebook();
    }

    async function showPhonebook(e) { 
        phonebookUl.innerHTML='';
        const responce=await fetch(url);
        const phonebookData=await responce.json();
        Object.values(phonebookData).forEach(n=>{
            let li=document.createElement('li');
            li.textContent=`${n.person}: ${n.phone}`;
            li.setAttribute('id',n._id);
            let buttonDelete=document.createElement('button');
            buttonDelete.textContent='Delete';
            buttonDelete.addEventListener('click',deleteContact);
            li.appendChild(buttonDelete);
            phonebookUl.appendChild(li);
        })
    }

    async function deleteContact(e) {
        const key=e.target.parentNode.id;
        const urlIdToDelete=' http://localhost:3030/jsonstore/phonebook/'+key;
        e.target.parentNode.remove();
        await fetch(urlIdToDelete,{
            method: 'delete'
        })
    }
}

attachEvents();
function solve() {
    document.querySelector('#loadBooks').addEventListener('click', loadAllBooks);
    document.querySelector('form button').addEventListener('click',callTheRigthFunction);
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const form=document.querySelector('form');
    let tableBody=document.querySelector('tbody');
    tableBody.innerHTML='';
    let toEditId='';

    async function deleteBook(e) {
        let bookToDeleteId=e.target.parentNode.parentNode.id;
        const urlBookToDlete='http://localhost:3030/jsonstore/collections/books/'+bookToDeleteId;
        await fetch(urlBookToDlete,{
            method:'delete'
        })
        loadAllBooks();
    }

    async function edit(e) {
        let bookToEdit=e.target.parentNode.parentNode;
        let title=bookToEdit.children[0].textContent;
        let author=bookToEdit.children[1].textContent;
        form.querySelector('h3').textContent='Edit FORM';
        form.querySelector('#author').value=author;
        form.querySelector('#title').value=title;
        let button=form.querySelector('button');
        button.textContent='Save';
        toEditId=bookToEdit.id;
    }

    async function changeRecord(id){
        const urlBookToChange='http://localhost:3030/jsonstore/collections/books/'+id;
        let newAuthor= form.querySelector('#author').value;
        let newTitle=form.querySelector('#title').value;
        const responce= await fetch(urlBookToChange,{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                author:newAuthor,
                title:newTitle
            })
        })
        tableBody.innerHTML='';
        loadAllBooks();
    }

     function callTheRigthFunction(e) {
        let form=e.target.parentNode;
        e.preventDefault();
        if (e.target.textContent==='Submit') {
            createNewRecord(e);
        } else {
            changeRecord(toEditId);
            cancelEditForm(form);
        }
        form.reset();
    }

    async function createNewRecord(e) {
        let authorName=form.querySelector('#author').value;
        let titleName=form.querySelector('#title').value;
        if (authorName!==''&&titleName!=='') {
            await fetch(url,{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    author:authorName,
                    title:titleName
                })
            })
            loadAllBooks();
        }
    }

    function cancelEditForm(formEdit) {
        formEdit.querySelector('h3').textContent='FORM';
        formEdit.querySelector('button').textContent='Submit';
    }

    async function loadAllBooks(e) {
        tableBody.innerHTML='';
        const responce = await fetch(url);
        const dataBooks = await responce.json();
        Object.entries(dataBooks).forEach(book => createBook(book[1].author,book[1].title,book[0]));   
    }

    function createBook(author,title,id) {
        let tr=document.createElement('tr');
        tr.setAttribute('id',id);
        let tdTitle=document.createElement('td');
        tdTitle.textContent=title;
        tr.appendChild(tdTitle);
        let tdAuthor=document.createElement('td');
        tdAuthor.textContent=author;
        tr.appendChild(tdAuthor);
        let td=document.createElement('td');
        let btnEdit=document.createElement('button');
        btnEdit.textContent='Edit';
        btnEdit.addEventListener('click',edit);
        td.appendChild(btnEdit);
        let btnDelete=document.createElement('button');
        btnDelete.textContent='Delete';
        btnDelete.addEventListener('click',deleteBook)
        td.appendChild(btnDelete);
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
}

solve();
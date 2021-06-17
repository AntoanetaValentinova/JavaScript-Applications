import {render, html} from './node_modules/lit-html/lit-html.js'

const body=document.body;

const templatePage=(allBooks=[]) => html`
<button @click=${loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          ${Object.entries(allBooks).map(b=>templateBook(b))}
        </tbody>
    </table>

    <form @submit=${createNewBook} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>

    <form style="display:none" id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." >
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>`

const resultPage=templatePage();
render(resultPage,body);
const tbody=document.querySelector('tbody');

const templateBook = (book) => html`
             <tr id=${book[0]}>
                <td>${book[1].title}</td>
                <td>${book[1].author}</td>
                <td>
                    <button @click=${showEdit}>Edit</button>
                    <button @click=${deleteBook}>Delete</button>
                </td>
            </tr>`;

async function loadBooks() {
    const allBooks=await getBooks();
    const result=templatePage(allBooks);
    render(result,body);
}

async function createNewBook(ev) {
    ev.preventDefault();
    const formData=new FormData(ev.target);
    const title=formData.get('title');
    const author=formData.get('author');
    if (title===''||author==='') {
        return alert('All fields are required!')
    }
    ev.target.reset();
    postBook(author,title);
    loadBooks();
}

async function showEdit(ev) {
    ev.preventDefault();
    const idCurrentBook=ev.target.parentNode.parentNode.id;
    const currentBook=await getBookById(idCurrentBook);
    const formEdit=document.querySelector('#edit-form');
    const formAdd=document.querySelector('#add-form');
    formEdit.style.display='block';
    formAdd.style.display='none';
  
    const titleInput=formEdit.querySelector('input[name="title"]');
    const authorInput=formEdit.querySelector('input[name="author"]');
    titleInput.value=currentBook.title;
    authorInput.value=currentBook.author;

   
    formEdit.addEventListener('submit',edit)
    async function edit (ev){
        ev.preventDefault();
        const formData=new FormData(ev.target);
        const title=formData.get('title');
        const author=formData.get('author');
        if (title===''||author==='') {
            return alert('All fields are required!')
        }
        await editBook(author,title,idCurrentBook);
        await loadBooks();
        formEdit.style.display='none';
        formAdd.style.display='block';
    }
}


async function editBook(author,title,id) {
    const url='http://localhost:3030/jsonstore/collections/books/'+id;
    console.log(url)
    const responce=await fetch(url,{
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({author,title})
    });
    if (responce.ok===false) {
        const err=await responce.json();
        alert(err.message)
        throw new Error(err.message)
    }
    const data=await responce.json();
    return data;
}

async function postBook(author,title) {
    const url='http://localhost:3030/jsonstore/collections/books/';
    console.log(url)
    const responce=await fetch(url,{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({author,title})
    });
    if (responce.ok===false) {
        const err=await responce.json();
        alert(err.message)
        throw new Error(err.message)
    }
    const data=await responce.json();
    return data;
}
async function deleteBook (ev) {
   const id= ev.target.parentNode.parentNode.id;
   await del(id);
   loadBooks();
}

async function del(id) {
    const url='http://localhost:3030/jsonstore/collections/books/'+id;
    const responce=await fetch(url,{
        method: 'delete',
    });
    if (responce.ok===false) {
        const err=await responce.json();
        alert(err.message)
        throw new Error(err.message)
    }
    const data=await responce.json();
    return data;
}


async function getBooks() {
    const responce=await fetch('http://localhost:3030/jsonstore/collections/books');
    if (responce.ok===false) {
        const err=await responce.json();
        alert(err.message)
        throw new Error(err.message)
    }
    const data=await responce.json();
    return data;
}

async function getBookById(id) {
    const responce=await fetch('http://localhost:3030/jsonstore/collections/books/'+id);
    if (responce.ok===false) {
        const err=await responce.json();
        alert(err.message)
        throw new Error(err.message)
    }
    const data=await responce.json();
    return data;
}


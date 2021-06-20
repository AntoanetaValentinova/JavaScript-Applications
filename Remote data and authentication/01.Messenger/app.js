function attachEvents() {
    document.querySelector('#submit').addEventListener('click',post);
    document.querySelector('#refresh').addEventListener('click',refresh);
    const url='http://localhost:3030/jsonstore/messenger';
    const textArea=document.querySelector('#messages');

    async function refresh(e) {
        const responceMessages=await fetch(url);
        const data=await responceMessages.json();
        let result='';
        Object.values(data).forEach(c=>result+=`${c.author}: ${c.content}\n`);
        textArea.textContent=result;
    }

    async function post(e) {
        let authorName=document.querySelector('#author').value;
        let content=document.querySelector('#content').value;
        const responce=await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: authorName,
                content: content
            })
        })
    }
}

attachEvents();
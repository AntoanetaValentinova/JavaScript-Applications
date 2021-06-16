function attachEvents() {
    document.querySelector('#btnLoadPosts').addEventListener('click',getPosts);
    document.querySelector('#btnViewPost').addEventListener('click',getComments);
    let posts=document.querySelector('#posts');

    async function getComments(e) {
        let selectedPost=posts.value;
        const urlPost='http://localhost:3030/jsonstore/blog/posts/'+selectedPost;
        let responcePost=await fetch(urlPost);
        let dataPost=await responcePost.json();
        document.querySelector('#post-title').textContent=dataPost.title;
        document.querySelector('#post-body').textContent=dataPost.body;
        let commentsUl=document.querySelector('#post-comments');
        commentsUl.innerHTML='';
        const urlComments='http://localhost:3030/jsonstore/blog/comments';
        let responceComments=await fetch(urlComments);
        let dataComments=await responceComments.json();
        Object.values(dataComments).filter(c=>c.postId===selectedPost).forEach(c=> {
            let liComment=document.createElement('li');
            liComment.setAttribute('id',c.id);
            liComment.textContent=c.text;
            commentsUl.appendChild(liComment);
        })      
    }

    async function getPosts(e) {
        const url='http://localhost:3030/jsonstore/blog/posts';
        let responce=await fetch(url);
        let data= await responce.json();
        Object.entries(data).forEach(p=>{
            let option=document.createElement('option');
            option.setAttribute('value',p[0]);
            option.textContent=p[1].title;
            posts.appendChild(option);
        })
    }
}

attachEvents();
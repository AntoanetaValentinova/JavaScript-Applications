function loadCommits() {
    const username=document.querySelector('#username').value;
    const repo=document.querySelector('#repo').value;
    const url=`https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
    .then(function (responce) {
        if(responce.status!==200) {
            console.log(responce)
            throw new Error(`${responce.status} (${responce.statusText})`);
        }
       return responce.json()
    })
    .then(data=>{
        let ul=document.querySelector('#commits');
        data.forEach(r=> {
            let liEl=document.createElement('li');
            liEl.textContent=`${r.commit.author.name}: ${r.commit.message}`;
            ul.appendChild(liEl);
        })     
    })
    .catch (error=> console.log(error)); 

    //`${error.status} (${error.statusText})`
}
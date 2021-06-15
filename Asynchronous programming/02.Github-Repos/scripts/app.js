function loadRepos() {
	let username=document.querySelector('#username').value;
	let list=Array.from(document.querySelector('#repos'));
	const url=`https://api.github.com/users/${username}/repos`;

	fetch (url)
	.then(responce => responce.json())
	.then (data=> {
		let ulElement=document.querySelector('#repos');
		ulElement.innerHTML='';
		data.forEach(r=>{
			let li=document.createElement('li');
			li.textContent=r.full_name;
			ulElement.appendChild(li);
		})
	})
	.catch(error=>{
		console.log(error)
	});
}
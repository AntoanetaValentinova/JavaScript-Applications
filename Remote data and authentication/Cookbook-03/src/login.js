document.querySelector('form').addEventListener('submit',onLoginSubmit);

async function onLoginSubmit(event) {
    event.preventDefault();
    const formData=new FormData(event.target);
    const email=formData.get('email');
    const password=formData.get('password');

    const responce= await fetch ('http://localhost:3030/users/login',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email,password})
    });

    if (responce.ok===false) {
        const error=await responce.json();
        return alert(error.message);
    }

    const data=await responce.json();
    sessionStorage.setItem('userToken',data.accessToken);
    window.location.pathname='index.html';
}
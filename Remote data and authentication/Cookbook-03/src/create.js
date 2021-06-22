document.querySelector('form').addEventListener('submit', onCreateSubmit);

async function onCreateSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l !== '');
    const steps = formData.get('steps')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l !== '');

    const token = sessionStorage.getItem('userToken');
    const urlPost='http://localhost:3030/data/recipes/';
    const response = await fetch(urlPost, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        bosy: JSON.stringify({ name, img, ingredients, steps })
    })

    if (response.ok === false) {
        const error = await response.json();
        return alert(error.message);
    }
    window.location.pathname='index.html';
}
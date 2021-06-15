function lockedProfile() {

    let main = document.querySelector('main');
    main.innerHTML = '';
    render();

    async function render() {
        let url = `http://localhost:3030/jsonstore/advanced/profiles`;
        const responce = await fetch(url);
        const data = await responce.json();
        Object.values(data).forEach((p) => {
            let button=e('button','Show more');
            button.addEventListener('click',onclick);
            let div = e('div', '', { class: 'profile' },
                e('img', '', { src: "./iconProfile2.png", class: "userIcon" }),
                e('label', 'Lock'),
                e('input', '', { type: "radio", name: "user1Locked", value: "lock",checked: 'true'}),
                e('label', 'Unlock'),
                e('input', '', { type: "radio", name: "user1Locked", value: "unlock" }),
                e('br'),
                e('hr'),
                e('label', 'Username'),
                e('input', '', { type:"text", name:"user1Username", value:p.username,disabled:true,readonly:true}),
                e('div', '', { id:"user1HiddenFields" },
                    e('hr'),
                    e('label', 'Email:'),
                    e('input', '', { type:"email", name:"user1Email", value:p.email,disabled:true,readonly:true}),
                    e('label', 'Age:'),
                    e('input', '', { type:"email", name:"user1Age", value:p.age,disabled:true,readonly:true})
                ));
                div.appendChild(button);
                main.appendChild(div);
        });  
    }

    function onclick(e) {
        let div=e.target.parentNode;
        let lock=div.querySelector('input[value="lock"]');
        let unlock=div.querySelector('input[value="unlock"]');
        let hidden=div.querySelector('#user1HiddenFields');
        if (lock.checked) {
            return;
        } else if (!lock.checked&&unlock.checked&&e.target.textContent==='Show more'){
            hidden.style.display='block';
            e.target.textContent='Hide it';
        } else if (!lock.checked&&unlock.checked&&e.target.textContent==='Hide it') {
            hidden.style.display='none';
            e.target.textContent='Show more';
        }
        
    }

    function e(type, textContent, atributes, ...children) {
        const element = document.createElement(type);
        if (textContent) {
            element.textContent = textContent;
        }
        if (atributes) {
            Object.entries(atributes).forEach(a => {
                element.setAttribute(a[0], a[1]);
            })
        }
        if (children) {
            children.forEach(c => element.appendChild(c));
        }
        return element;
    }
}









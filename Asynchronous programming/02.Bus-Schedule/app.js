function solve() {
   console.log('start');
    const info=document.querySelector('#info');
    const arriveBtn=document.querySelector('#arrive');
    const departBtn=document.querySelector('#depart');

    let nextStop = {
        next: 'depot',
    };

     async function depart() {
        const url=`http://localhost:3030/jsonstore/bus/schedule/`+ nextStop.next;
        const responce= await fetch(url);
        const stop=await responce.json();
        departBtn.disabled=true;
        arriveBtn.disabled=false;
        nextStop=stop;
        info.textContent=`Next stop ${nextStop.name}`;
    }

    function arrive() {
        arriveBtn.disabled=true;
        departBtn.disabled=false;
        info.textContent=`Arriving at ${nextStop.name}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
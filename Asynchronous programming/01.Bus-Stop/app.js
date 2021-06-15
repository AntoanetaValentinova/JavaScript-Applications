async function getInfo() {
    const input=document.querySelector('#stopId');
    const ul=document.querySelector('#buses');
    ul.innerHTML='';
    const stopName=document.querySelector('#stopName');
    const idBus=input.value;
    const url='http://localhost:3030/jsonstore/bus/businfo/'+idBus;
    const responce=await fetch(url);
  
   
    const validValues=['1287','1308','1327','2334'];
    if (responce.ok===false||!validValues.includes(idBus)) {
        stopName.textContent='Error';
    } else {
        const data=await responce.json();
        stopName.textContent=data.name;
        Object.entries(data.buses).forEach(e=>{
            let liEl=document.createElement('li');
            liEl.textContent=`Bus ${e[0]} arrives in ${e[1]}`
            ul.appendChild(liEl);
        })
        input.value='';
    }
   
}
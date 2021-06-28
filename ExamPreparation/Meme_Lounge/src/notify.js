const errorBox= document.querySelector('#errorBox');

export function notify (errorMessage) {
    let span=errorBox.querySelector('span');
    span.textContent=errorMessage;
    errorBox.style.display='block';
    setTimeout(()=>{
        errorBox.style.display='none';
    },3000);
}
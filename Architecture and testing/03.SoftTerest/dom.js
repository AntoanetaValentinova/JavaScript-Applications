export function newElement(type,text,attr,...children) {
    let element=document.createElement(type);
    if (text) {
        element.textContent=text;
    }
    if (attr) {
        Object.entries(attr).forEach(a=>{
            element.setAttribute(a[0],a[1]);
        })
    }
    if (children) {
        children.forEach(c=>element.appendChild(c));
    }
    return element;
}
let collection = document.getElementsByTagName('body');

function myOnClick(event){
    let el = event.target;
    el.style["backgroundColor"] = "red";
}

for (let i = 0; i < 9;++i){
    for (let j = 0; j < 5;++j){
        let a = document.createElement('button');
        a.onclick = myOnClick;
        collection.item(0).appendChild(a);
    }
    let b = document.createElement('br');
    collection.item(0).appendChild(b);
}

let collection = document.getElementsByTagName('body');

/*Функция, обрабатывающая клик по кнопке и меняющая её цвет на красный.*/
function myOnClick(event){
    let el = event.target;
    el.style["backgroundColor"] = "red";
}


for (let i = 0; i < 9;++i){
    for (let j = 0; j < 5;++j){
        let a = document.createElement('button');
        a.onclick = myOnClick;
        collection.item(0).appendChild(a); // Добавляем кнопку в текущую строку.
    }
    let b = document.createElement('br');// Переходим на следующую строку.
    collection.item(0).appendChild(b);
}

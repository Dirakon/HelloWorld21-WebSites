/*Функция, обрабатывающая клик по кнопке и меняющая её цвет на красный.*/
function myOnClick(event){
    // Включаем звук нажатия
    (new Audio('https://rpg.hamsterrepublic.com/wiki-images/8/8e/Confirm8-Bit.ogg')).play();
    let el = event.target;
    el.style["backgroundColor"] = "red";
}
// Заранее загружаем необходимые звуки (без этого первое время звуков не будет)
new Audio('https://rpg.hamsterrepublic.com/wiki-images/8/8e/Confirm8-Bit.ogg');

for (let i = 0; i < 9;++i){
    for (let j = 0; j < 5;++j){
        let a = document.createElement('button');
        a.onclick = myOnClick;
        document.body.appendChild(a); // Добавляем кнопку в текущую строку.
    }
    let b = document.createElement('br');// Переходим на следующую строку.
    document.body.appendChild(b);
}

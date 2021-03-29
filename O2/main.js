
// Заранее загружаем необходимые звуки (без этого первое время звуков не будет)
new Audio('https://rpg.hamsterrepublic.com/wiki-images/8/8e/Confirm8-Bit.ogg')

// Функция, обрабатывающая клики
function handle(event){
    // Делаем линию выделяющейся

    let elements = document.getElementsByClassName('inputer');

    let a = parseFloat(elements[0].innerHTML), b = parseFloat(elements[1].innerHTML), c = parseFloat(elements[2].innerHTML);


    ctx.fillStyle = 'black';
    for (let x = 0; x < width;++x){
        let functionalX = (x - width/2)/(width/2)*100;
        let functionalY = 100 - (a*functionalX*functionalX + b*functionalX + c);
        if (functionalY < 0 || functionalY > 100)
            continue;
        let normalY = parseInt(height*(functionalY/100))
       // alert([normalY,x]);
        ctx.fillRect(x,normalY,5,5); // fill in the pixel at (10,10)
    }
    // Включаем звук нажатия
    (new Audio('https://rpg.hamsterrepublic.com/wiki-images/8/8e/Confirm8-Bit.ogg')).play();

}
// Находим полотно и настраиваем его
const canvas = document.querySelector('.myCanvas');
const width = window.innerWidth;
const height =  window.innerHeight;

// Настраиваем контекст полотна
const ctx = canvas.getContext('2d');
ctx.canvas.width = width;
ctx.canvas.height=height;

// Делаем фоновый цвет
ctx.fillStyle = 'wheat';
ctx.fillRect(0,0,width,height);

// Соглашаемся принимать клики
document.querySelector('button').onclick=handle;

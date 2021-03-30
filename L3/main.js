// Случайный цвет
function getRandomColor(){
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

// Заранее загружаем необходимые звуки (без этого первое время звуков не будет)
new Audio('https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg')

// Функция, обрабатывающая клики
function handle(event){
    let point = {x:event.clientX, y:event.clientY};

    // Находим самую маленькую сторону (высота или ширина) и от неё находим максимальный и минимальный радиус,
    // Чтобы всё более менее влезло
    let minResolution = Math.min(width,height);
    let minRadius = 0.02 *minResolution;
    let maxRadius = 0.2 * minResolution;

    // Создаём радиус
    let radius = Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius;

    // Рисуем круг с чёрной обводкой шириной 5 и заливкой случайного цвета в позиции клика
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    // Играем звук создания круга.
    (new Audio('https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg')).play()

}

// Находим полотно и настраиваем его
const canvas = document.querySelector('.myCanvas');
const height =  window.innerHeight;
const width = window.innerWidth;

// Настраиваем контекст полотна
const ctx = canvas.getContext('2d');
ctx.canvas.width = width;
ctx.canvas.height=height;

// Делаем фоновый цвет
ctx.fillStyle = 'wheat';
ctx.fillRect(0,0,width,height);

// Соглашаемся принимать клики
document.body.onclick=handle;


// Переменная, позволяющая отличить четные нажатия от нечетных
let clickDone = false

// Заранее загружаем необходимые звуки (без этого первое время звуков не будет)
new Audio('http://onj3.andrelouis.com/phonetones/unzipped/Nokia/C6-00/ui-pen_down04.wav')

// Функция, обрабатывающая клики
function handle(event){
    // Делаем линию выделяющейся
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    // Рисуем линию или ставим точку в зависимости от четности клика
    if (!clickDone){
        ctx.beginPath();
        ctx.moveTo(event.clientX, event.clientY);
        clickDone = true
    }else {
        ctx.lineTo(event.clientX, event.clientY);
        ctx.closePath();
        ctx.stroke();
        clickDone = false;
        // Звук для рисования
        (new Audio('http://onj3.andrelouis.com/phonetones/unzipped/Nokia/C6-00/ui-pen_down04.wav')).play();
    }
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
document.body.onclick=handle;

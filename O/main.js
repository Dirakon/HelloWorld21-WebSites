
// Переменная, позволяющая отличить четные нажатия от нечетных
clickDone = false

// Функция, обрабатывающая клики
function handle(event){
    // Делаем линию выделяющейся
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    // Рисуем линию или ставим точку в зависимости от четности клика
    if (!clickDone){
        ctx.moveTo(event.clientX, event.clientY);
        clickDone = true
    }else {
        ctx.lineTo(event.clientX, event.clientY);
        ctx.stroke();
        clickDone = false
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

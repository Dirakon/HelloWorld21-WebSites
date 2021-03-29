
// Переменная, позволяющая отличить четные нажатия от нечетных
clickDone = false
startOfLine = undefined



let allLines = [];
const speed = 35;
const timeoutTime = 35;
const lowerBarHeightPercent = 20;
const higherBarWidthPercent=20;
const lowerBarWidthPercent=40;

function getRandomColor(){
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}


// Функция, обрабатывающая клики
function handle(event){
    let point = {x:event.clientX, y:event.clientY};
    // Нельзя ставить точки за пределами 'L'
    if (!insideL(point))
        return;
    let minResolution = Math.min(width,height);
    let minRadius = 0.02 *minResolution;
    let maxRadius = 0.2 * minResolution;
    let radius = Math.floor(Math.random() * (maxRadius - minRadius + 1)) + minRadius;

    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();
    (new Audio('https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg')).play()

}

function insideL(point){
    if (point.x < 0){
        return false;
    }

    if (point.y > height - lowerBarHeightPixels){
        // Нижняя полоска 'L'
        if (point.y >= height){
            return false;
        }

        if (point.x > lowerBarWidthPixels){
            return false;
        }
    }else{
        // Всё остальное
        if (point.y <= 0){
            return false;
        }
        if (point.x > higherBarWidthPixels){
            return false;
        }

    }
    return true;
}

// Находим полотно и настраиваем его
const canvas = document.querySelector('.myCanvas');
const height =  window.innerHeight;
const width = window.innerWidth;

// Настраиваем контекст полотна
const ctx = canvas.getContext('2d');
ctx.canvas.width = width;
ctx.canvas.height=height;

let higherBarWidthPixels = width*(higherBarWidthPercent/100);
let lowerBarWidthPixels = width*(lowerBarWidthPercent/100);
let lowerBarHeightPixels = height*(lowerBarHeightPercent/100);

// Делаем фоновый цвет
ctx.fillStyle = 'wheat';
ctx.fillRect(0,0,width,height);

// Соглашаемся принимать клики
document.body.onclick=handle;

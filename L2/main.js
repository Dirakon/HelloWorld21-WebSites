
// Переменная, позволяющая отличить четные нажатия от нечетных
let clickDone = false

let startOfLine = undefined
let allLines = [];
const speed = 35;
const timeoutTime = 35;

// Какую часть экрана занимают нижняя часть 'L' и верхняя.
const lowerBarHeightPercent = 20;
const higherBarWidthPercent=20;
const lowerBarWidthPercent=40;


// Заранее загружаем необходимые звуки (без этого первое время звуков не будет)
new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3')

// Функция, обрабатывающая клики
function handle(event){
    // Нельзя ставить точки за пределами 'L'
    let collision = getCollision({x:event.clientX, y:event.clientY},{x:0,y:0},0)
    if (collision.vertical || collision.horizontal){
        return;
    }

    // Действуем в зависимости от чётности клика
    if (!clickDone){
        // Подготавливаем первую точку
        startOfLine = {x:event.clientX, y:event.clientY};
        clickDone = true;
    }else {
        // Стартуем луч

        // Вектор от одного клика ко второму
        let mover = {y:(event.clientY-startOfLine.y),x:(event.clientX-startOfLine.x)};

        // Стараемся дать этому вектору длину "1"
        let totalMove = Math.abs( mover.y)+ Math.abs(mover.x);
        mover.x=mover.x/totalMove;
        mover.y=mover.y/totalMove;

        // Подготавливаем объект и помещаем его в список всех лучей
        let curLine = {position:startOfLine,direction:mover};
        allLines.push(curLine);

        clickDone = false;
    }
}

// Проверка столкновения
function getCollision(startingPoint,direction,speed){
    let collision = {vertical:false,horizontal:false};

    // Точка, в которую мы попадаем
    let point ={x:startingPoint.x + direction.x*speed,
        y:startingPoint.y + direction.y*speed};

    // Столкновение с левой границей
    if (point.x < 0){
        collision.horizontal=true;
    }

    if (point.y > height - lowerBarHeightPixels){
        // Нижняя полоска 'L'

        // Столкновение с нижней границей
        if (point.y >= height){
            collision.vertical=true;
        }

        // Столкновение с правой границей нижней части 'L'
        if (point.x > lowerBarWidthPixels){
            collision.horizontal=true;
        }
    }else{
        // Всё остальное

        // Столкновение с верхней границей
        if (point.y <= 0){
            collision.vertical=true;
        }

        if (startingPoint.x > higherBarWidthPixels){
            // Мы пришли из нижней полоски

            // Столкновение с верхней границей нижней полоски 'L'
            if (point.x > higherBarWidthPixels){
                collision.vertical=true;
            }

            // Столкновение с правой границей нижней части 'L'
            if (point.x > lowerBarWidthPixels){
                collision.horizontal=true;
            }
        }
        else{

            // Столкновение с правой границей верхней части 'L'
            if (point.x > higherBarWidthPixels){
                collision.horizontal=true;
            }
        }

    }
    return collision;
}

// Находим полотно и настраиваем его
const canvas = document.querySelector('.myCanvas');
const height =  window.innerHeight;
const width = window.innerWidth;

// Настраиваем контекст полотна
const ctx = canvas.getContext('2d');
ctx.canvas.width = width;
ctx.canvas.height=height;

// Находим размер необходимых частей уже в пикселях
let higherBarWidthPixels = width*(higherBarWidthPercent/100);
let lowerBarWidthPixels = width*(lowerBarWidthPercent/100);
let lowerBarHeightPixels = height*(lowerBarHeightPercent/100);

// Устанавливаем фоновый цвет
ctx.fillStyle = 'wheat';
ctx.fillRect(0,0,width,height);

// Постоянно выполняющаяся функция
setInterval(function () {
    for (let i = 0; i < allLines.length;++i){

        // Проверяем столкновения
        let collision = getCollision(allLines[i].position,allLines[i].direction,speed);
        if (collision.vertical || collision.horizontal){
            // Играем звук столкновения
            (new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3')).play();
        }
        if (collision.vertical){
            allLines[i].direction.y = -allLines[i].direction.y
        }
        if (collision.horizontal){
            allLines[i].direction.x = -allLines[i].direction.x
        }

        // Рисуем пройденный лучем за этот промежуток времени отрезок и меняем координаты луча
        ctx.beginPath();
        ctx.moveTo(allLines[i].position.x,allLines[i].position.y);

        allLines[i].position.x+=allLines[i].direction.x*speed;
        allLines[i].position.y+=allLines[i].direction.y*speed;

        ctx.lineTo(allLines[i].position.x,allLines[i].position.y);
        ctx.closePath();
        ctx.stroke();
    }

},timeoutTime)

// Соглашаемся принимать клики
document.body.onclick=handle;

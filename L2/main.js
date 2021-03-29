
// Переменная, позволяющая отличить четные нажатия от нечетных
clickDone = false
startOfLine = undefined



let allLines = [];
const speed = 35;
const timeoutTime = 35;
const lowerBarHeightPercent = 20;
const higherBarWidthPercent=20;
const lowerBarWidthPercent=40;



// Функция, обрабатывающая клики
function handle(event){
    // Делаем линию выделяющейся
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    // Нельзя ставить точки за пределами 'L'
    let collision = getCollision({x:event.clientX, y:event.clientY},{x:0,y:0},0)
    if (collision.vertical || collision.horizontal){
        return;
    }

    // Рисуем линию или ставим точку в зависимости от четности клика
    if (!clickDone){
        startOfLine = {x:event.clientX, y:event.clientY};
        clickDone = true;
    }else {
        let mover = {y:(event.clientY-startOfLine.y),x:(event.clientX-startOfLine.x)};
        let totalMove = Math.abs( mover.y)+ Math.abs(mover.x);


        mover.x=mover.x/totalMove;
        mover.y=mover.y/totalMove;

        let curLine = {position:startOfLine,direction:mover};
        allLines.push(curLine);

        clickDone = false;
    }
}

function getCollision(startingPoint,direction,speed){
    let collision = {vertical:false,horizontal:false};

    let point ={x:startingPoint.x + direction.x*speed,
        y:startingPoint.y + direction.y*speed};

    if (point.x < 0){
        collision.horizontal=true;
    }

    if (point.y > height - lowerBarHeightPixels){
        // Нижняя полоска 'L'
        if (point.y >= height){
            collision.vertical=true;
        }

        if (point.x > lowerBarWidthPixels){
            collision.horizontal=true;
        }
    }else{
        // Всё остальное
        if (point.y <= 0){
            collision.vertical=true;
        }
        if (startingPoint.x > higherBarWidthPixels){
            // Мы пришли из нижней полоски
            if (point.x > higherBarWidthPixels){
                collision.vertical=true;
            }
            if (point.x > lowerBarWidthPixels){
                collision.horizontal=true;
            }
        }
        else{
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

let higherBarWidthPixels = width*(higherBarWidthPercent/100);
let lowerBarWidthPixels = width*(lowerBarWidthPercent/100);
let lowerBarHeightPixels = height*(lowerBarHeightPercent/100);

// Делаем фоновый цвет
ctx.fillStyle = 'wheat';
ctx.fillRect(0,0,width,height);

setInterval(function () {
    for (let i = 0; i < allLines.length;++i){
        let collision = getCollision(allLines[i].position,allLines[i].direction,speed);
        if (collision.vertical){
            allLines[i].direction.y = -allLines[i].direction.y
        }
        if (collision.horizontal){
            allLines[i].direction.x = -allLines[i].direction.x
        }

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

onkeyup=handle;

let orderedSells = 2;   // "Заказанная длина" змеи - количество клеток, на которое та должна увеличиться, перед тем, как начать по-настоящему перемещаться

// Заранее загружаем необходимые звуки (без этого первое время звуков не будет)
new Audio('https://rpg.hamsterrepublic.com/wiki-images/2/21/Collision8-Bit.ogg')
new Audio('http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatpellet.ogg')
new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav')

// Функция, ответственная за управление при помощи клавиатуры.
function handle(e) {

    //Копируем координаты головы змеи по значению
    let coords = [...snake[0]];
    switch (e.key.toUpperCase()) {
        case 'W':
            coords[1]-=1;
            break;
        case 'D':
            coords[0]+=1;
            break;
        case 'S':
            coords[1]+=1;
            break;
        case 'A':
            coords[0]-=1;
            break;
        default:
            return;
    }

    // Запрещаем наступление на часть тела
    if (field[coords[1]][coords[0]].className === 'snake' ) {
        // Включаем звук столкновения
        (new Audio('https://rpg.hamsterrepublic.com/wiki-images/2/21/Collision8-Bit.ogg')).play();
        return;
    }

    // Переводим уже сдвинутые координаты в формат, которым описаны координаты яблок
    let appleFormatCoordinates = coords[0]*10+coords[1];

    //Если мы наступили на яблоко, удаляем его и увеличиваем заказанную длину.
    if (appleCoords.includes(appleFormatCoordinates)){
        // Включаем звук поедания яблока
        (new Audio('http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatpellet.ogg')).play();
        appleCoords.splice(appleCoords.indexOf(appleFormatCoordinates),1);
        orderedSells+=orderedCellsPerApple;
    }else{
        // Включаем звук движения
        (new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav')).play();
    }

    //Добавляем новый блок змеи на данной клетке.
    snake.splice(0,0,[coords[0],coords[1]]);
    field[coords[1]][coords[0]].className = "snake";
    if (orderedSells !== 0){
        orderedSells--;
    }else{
        // Если больше не осталось заказанной длины, удаляем последний блок змеи.
        let lastSnakeId = snake.length-1;
        field[snake[lastSnakeId][1]][snake[lastSnakeId][0]].className="blank";
        snake.splice(lastSnakeId,1);
    }
}

// Координаты яблок в формате *колонка-строка*. Такой формат подходит, т.к. поле 10*10 и на первой колонке или на первом ряду яблок не будет.
let appleCoords = [41, 42, 62, 72, 34, 64 ,65, 35 ,47, 48, 67 ]
let field = [];
let snake = [];

// Стартовые координаты змеи.
const startCoords = 77

// На сколько клеток увеличится змея, попробовав яблоко.
const orderedCellsPerApple=3;

for (let i = 0; i < 10;++i){
    let thisLine = [];
    for (let j = 0; j < 10;++j){
        let a = document.createElement('div');
        // Переводим координаты в формат яблок.
        let coords = j*10 + i;
        if (coords === startCoords) {
            a.className = "snake";
            snake.push([j,i]);
        }
        else if (appleCoords.includes(coords)){
            a.className = "apple";
        }else {
            a.className = "blank";
        }

        // Сохраняем клетку в памяти.
        thisLine.push(a);

        // Добавляем клетку в текущую строку.
        document.body.appendChild(a);
    }
    field.push(thisLine);

    // Переходим на следующую строку.
    let b = document.createElement('br');
    document.body.appendChild(b);
}

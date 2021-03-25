let collection = document.getElementsByTagName('body');

onkeyup=handle;

let orderedSells = 2;   // "Заказанная длина" змеи - количество клеток, на которое та должна увеличиться, перед тем, как начать по-настоящему перемещаться

// Функция, ответственная за управление при помощи клавиатуры.
function handle(e) {
    let coords = [...snake[0]];  //Копируем координаты головы змеи по значению
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
    if (field[coords[1]][coords[0]].className === 'snake' ) {   // Запрещаем наступление на часть тела
        return;
    }
    let appleFormatCoordinates = coords[0]*10+coords[1];    // Переводим уже сдвинутые координаты в формат, которым описаны координаты яблок
    if (appleCoords.includes(appleFormatCoordinates)){  //Если мы наступили на яблоко, удаляем его и увеличиваем заказанную длину.
        appleCoords.splice(appleCoords.indexOf(appleFormatCoordinates),1);
        orderedSells+=orderedCellsPerApple;
    }
    snake.splice(0,0,[coords[0],coords[1]]);    //Добавляем новый блок змеи на данной клетке.
    field[coords[1]][coords[0]].className = "snake";
    if (orderedSells !== 0){
        orderedSells--;
    }else{  // Если больше не осталось заказанной длины, удаляем последний блок змеи.
        let lastSnakeId = snake.length-1;
        field[snake[lastSnakeId][1]][snake[lastSnakeId][0]].className="blank";
        snake.splice(lastSnakeId,1);
    }
}

let appleCoords = [41, 42, 62, 72, 34, 64 ,65, 35 ,47, 48, 67 ] // Координаты яблок в формате *колонка-строка*. Такой формат подходит, т.к. поле 10*10 и на первой колонке или на первом ряду яблок не будет.
let field = [];
const startCoords = 77  // Стартовые координаты змеи.
const orderedCellsPerApple=3;   // На сколько клеток увеличится змея, попробовав яблоко.
let snake = [];

for (let i = 0; i < 10;++i){
    let thisLine = [];
    for (let j = 0; j < 10;++j){
        let a = document.createElement('div');
        let coords = j*10 + i;  // Переводим координаты в формат яблок.
        if (coords === startCoords) {
            a.className = "snake";
            snake.push([j,i]);
        }
        else if (appleCoords.includes(coords)){
            a.className = "apple";
        }else {
            a.className = "blank";
        }
        thisLine.push(a);   // Сохраняем клетку в памяти.
        collection.item(0).appendChild(a);  // Добавляем клетку в текущую строку.
    }
    field.push(thisLine);
    let b = document.createElement('br');   // Переходим на следующую строку.
    collection.item(0).appendChild(b);
}

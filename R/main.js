let field = []

let startPosition = {y:0,x:2}; // Формат координат: строка - столбец, отсчёт с нуля
let currentCoords = {};
const blankColor = 'wheat';
const figureTypes = {
    1:[ ['*'],
        ['*'],
        ['*'],
        ['*']],
    2:[ ['*','*',' '],
        [' ','*','*']],
    3: [ [' ','*','*'],
         ['*','*',' ']]
}
let typesToAppear = [2,2,3,2,1,1]
let currentShapeDescription = undefined;
let currentColor = undefined;
function finishTheGame() {
    indicator.className='done';
    document.onkeydown = undefined;
}
function handle(e) {
    switch (e.key.toUpperCase()) {
        case 'D':
            move(1)
            break;
        case 'S':
            move(0);
            break;
        case 'A':
            move(-1);
            break;
    }
}
function getRandomColor(){
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

function containsType(coords,pattern, type) {
    for (let localY = 0; localY < pattern.length ;++localY){
        let globalY = localY+coords.y;
        for (let localX = 0 ; localX < pattern[localY].length;++localX){
            let globalX = localX + coords.x;
            if (pattern[localY][localX] === '*' && field[globalY][globalX].className === type){
                return true;
            }
        }
    }
    return false;
}

function fillWithColor(coords,pattern, color, type) {
    for (let localY = 0; localY < pattern.length ;++localY){
        let globalY = localY+coords.y;
        for (let localX = 0 ; localX < pattern[localY].length;++localX){
            let globalX = localX + coords.x;
            if (pattern[localY][localX] === '*'){
                field[globalY][globalX].className = type;
                field[globalY][globalX].style.backgroundColor = color;
            }
        }
    }
}

function hasThisTypeBelow(coords,pattern,type) {
    for (let localY = 0; localY < pattern.length ;++localY){
        let globalY = localY+coords.y;
        for (let localX = 0 ; localX < pattern[localY].length;++localX){
            let globalX = localX + coords.x;
            if (globalY !== field.length-1 // Не последняя строка
                && pattern[localY][localX] === '*'  // Клетка не пуста
                && (pattern.length === localY + 1 || pattern[localY+1] === ' ') // Снизу не часть нашей фигуры
                && field[globalY+1][globalX].className === type){ // Клетка ниже удовлетворяет условию
                return true;
            }
        }
    }
    return false;
}

function spawnNewShape() {
    if (typesToAppear.length === 0){
        finishTheGame();
        return;
    }
    let shapeType = typesToAppear[0];
    typesToAppear.splice(0,1);
    currentShapeDescription = figureTypes[shapeType];
    if (containsType(startPosition,currentShapeDescription,'figure')){
        finishTheGame();
        return;
    }
    currentColor = getRandomColor();
    fillWithColor(startPosition,currentShapeDescription,currentColor,'figure');
    currentCoords.y = startPosition.y;
    currentCoords.x=startPosition.x;
    if (hasThisTypeBelow(currentCoords,currentShapeDescription,'figure')){
        finishTheGame();
    }

}
function move(xIncrement,yIncrement=1) {
    fillWithColor(currentCoords,currentShapeDescription,blankColor,'cell');
    currentCoords.y+=yIncrement;
    currentCoords.x+=xIncrement;
  //  if (containsType(currentCoords,currentShapeDescription,'figure')){
  //      currentCoords.y-=yIncrement;
  //      currentCoords.x-=xIncrement;
  //      fillWithColor(currentCoords,currentShapeDescription,currentColor,'figure');
  //      spawnNewShape();
  //      return;
  //  }
    fillWithColor(currentCoords,currentShapeDescription,currentColor,'figure');
    if (hasThisTypeBelow(currentCoords,currentShapeDescription,'figure')){
        spawnNewShape();
    }else if (currentCoords.y + currentShapeDescription.length >= field.length){
        spawnNewShape();
    }

}

let indicator = document.createElement('div');
indicator.className = 'notDone';

for (let i = 0; i < 10;++i){
    let thisLine = [];
    for (let j = 0; j < 10;++j){
        let a = document.createElement('div');

        a.className = "cell";
        thisLine.push(a);   // Сохраняем клетку в памяти.
        document.body.appendChild(a);  // Добавляем клетку в текущую строку.
    }
    field.push(thisLine);
    let b = document.createElement('br');   // Переходим на следующую строку.
    document.body.appendChild(b);
}
spawnNewShape();
document.onkeydown=handle;

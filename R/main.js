let field = []

// Отсчёт с нуля
let startPosition = {y:0,x:2};
let currentCoords = {};
const blankColor = 'wheat';

// Настраиваем возможные фигуры
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

// Заранее загружаем необходимые звуки (без этого первое время звуков не будет)
new Audio('https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg')
new Audio('https://rpg.hamsterrepublic.com/wiki-images/2/21/Collision8-Bit.ogg')

// Указываем в каком порядке и какие фигуры будут появляться
let typesToAppear = [2,2,3,2,1,1]
let currentShapeDescription = undefined;
let currentColor = undefined;

// Конец игры
function finishTheGame() {
    indicator.className='done';
    document.onkeydown = undefined;
}

// Движение
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

// Случайный цвет
function getRandomColor(){
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

// Функция, проверяющая находится ли некий тип в клетках, которые, начиная с каких-то координат, удовлетворяют шаблону.
function containsType(coords,pattern, type) {
    // Итерируемся по шаблону
    for (let localY = 0; localY < pattern.length ;++localY){

        // Получаем глобальный Y
        let globalY = localY+coords.y;
        for (let localX = 0 ; localX < pattern[localY].length;++localX){

            // Получаем глобальный X
            let globalX = localX + coords.x;

            // Если в шаблоне эта клетка (локальные координаты) является звездой, а в мире (глобальные координаты) -
            // Требуемым типом, то мы нашли, то, о чём нас просили.
            if (pattern[localY][localX] === '*' && field[globalY][globalX].className === type){
                return true;
            }
        }
    }
    return false;
}

// Заполняем клетки в определённым цвет и тип в соответствии с шаблоном
function fillWithColor(coords,pattern, color, type) {
    for (let localY = 0; localY < pattern.length ;++localY){

        // Получаем глобальный Y
        let globalY = localY+coords.y;
        for (let localX = 0 ; localX < pattern[localY].length;++localX){

            // Получаем глобальный X
            let globalX = localX + coords.x;
            if (pattern[localY][localX] === '*'){
                field[globalY][globalX].className = type;
                field[globalY][globalX].style.backgroundColor = color;
            }
        }
    }
}

// Проверяем клетки на определённый тип под неким шаблоном
function hasThisTypeBelow(coords,pattern,type) {
    for (let localY = 0; localY < pattern.length ;++localY){

        // Получаем глобальный Y
        let globalY = localY+coords.y;
        for (let localX = 0 ; localX < pattern[localY].length;++localX){

            // Получаем глобальный X
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

// Создаём новую фигуру на стартовых координатах
function spawnNewShape() {

    // Если фигур в списке больше нет, игра завершена
    if (typesToAppear.length === 0){
        finishTheGame();
        return;
    }

    // Получаем новый тип и удаляем его из списка
    let shapeType = typesToAppear[0];
    typesToAppear.splice(0,1);
    currentShapeDescription = figureTypes[shapeType];

    // Если мы физически не можем создать новую фигуру на стартовых координатах, игра завершена
    if (containsType(startPosition,currentShapeDescription,'figure')){
        finishTheGame();
        return;
    }

    // Получаем случайный цвет и рисуем фигуру на стартовых координатах, используя этот цвет
    currentColor = getRandomColor();
    fillWithColor(startPosition,currentShapeDescription,currentColor,'figure');
    currentCoords.y = startPosition.y;
    currentCoords.x=startPosition.x;

    //Если вдруг под нами с самого начала что-то находится, игра завершена
    if (hasThisTypeBelow(currentCoords,currentShapeDescription,'figure')){
        finishTheGame();
    }

}

// Движение текущей фигуры
function move(xIncrement,yIncrement=1) {
    // Удаляем фигуру с её текущей позиции
    fillWithColor(currentCoords,currentShapeDescription,blankColor,'cell');

    // Делаем, собственно, движение
    currentCoords.y+=yIncrement;
    currentCoords.x+=xIncrement;

    // Если мы натолкнулись на какую-то фигуру (может случиться только при боковом движении, т.к. уже проведена проверка
    // на нахождение фигур под нами), то возвращаем всё как было и создаём новую фигуру
    if (containsType(currentCoords,currentShapeDescription,'figure')){
        currentCoords.y-=yIncrement;
        currentCoords.x-=xIncrement;
        fillWithColor(currentCoords,currentShapeDescription,currentColor,'figure');
        spawnNewShape();
        // Звук приземления.
        (new Audio('https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg')).play();
        return;
    }

    // Создаём ту же фигуру на новых координатах
    fillWithColor(currentCoords,currentShapeDescription,currentColor,'figure');

    if (hasThisTypeBelow(currentCoords,currentShapeDescription,'figure')){
        // Если под нами другая фигура, создаём новую.
        spawnNewShape();

        // Звук приземления.
        (new Audio('https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg')).play();
    }else if (currentCoords.y + currentShapeDescription.length >= field.length){
        // Если мы приземлись, создаём новую фигуру.
        spawnNewShape();

        // Звук приземления.
        (new Audio('https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg')).play();
    }else{
        // Звук полёта.
        (new Audio('https://rpg.hamsterrepublic.com/wiki-images/2/21/Collision8-Bit.ogg')).play();
    }

}

// Индикатор завершения программы
let indicator = document.createElement('div');
indicator.className = 'notDone';
document.body.appendChild(indicator);

for (let i = 0; i < 10;++i){
    let thisLine = [];
    for (let j = 0; j < 10;++j){
        let a = document.createElement('div');
        a.className = "cell";
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
spawnNewShape();
document.onkeydown=handle;

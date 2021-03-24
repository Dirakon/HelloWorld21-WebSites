let collection = document.getElementsByTagName('body');

onkeyup=handle;

let orderedSells = 2;

function handle(e) {
    let coords = [...snake[0]];
    switch (e.key) {
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
    if (field[coords[1]][coords[0]].className === 'snake' ) {
        return;
    }
    let appleFormatCoordinates = coords[0]*10+coords[1];
    if (appleCoords.includes(appleFormatCoordinates)){
        appleCoords.splice(appleCoords.indexOf(appleFormatCoordinates),1);
        orderedSells+=orderedCellsPerApple;
    }
    snake.splice(0,0,[coords[0],coords[1]]);
    field[coords[1]][coords[0]].className = "snake";
    if (orderedSells !== 0){
        orderedSells--;
    }else{
        let lastSnakeId = snake.length-1;
        field[snake[lastSnakeId][1]][snake[lastSnakeId][0]].className="blank";
        snake.splice(lastSnakeId,1);
    }
}

let appleCoords = [41, 42, 62, 72, 34, 64 ,65, 35 ,47, 48, 67 ]
let field = [];
const startCoords = 77
const orderedCellsPerApple=3;
let snake = []

for (let i = 0; i < 10;++i){
    let thisLine = [];
    for (let j = 0; j < 10;++j){
        let a = document.createElement('div');
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
        thisLine.push(a);
        collection.item(0).appendChild(a);
    }
    field.push(thisLine);
    let b = document.createElement('br');
    collection.item(0).appendChild(b);
}

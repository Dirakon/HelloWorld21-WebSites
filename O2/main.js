
// Заранее загружаем необходимые звуки (без этого первое время звуков не будет)
new Audio('https://rpg.hamsterrepublic.com/wiki-images/8/8e/Confirm8-Bit.ogg')

// Функция, обрабатывающая клики
function handle(event){
    // Заполняем пиксели чёрным цветом
    ctx.fillStyle = 'black';

    // Получаем поля для ввода и извлекаем из них коэфиценты для квадратного уравнения
    let elements = document.getElementsByClassName('inputer');
    let a = parseFloat(elements[0].innerHTML), b = parseFloat(elements[1].innerHTML), c = parseFloat(elements[2].innerHTML);

    // Итерируемся по иксам
    for (let x = 0; x < width;++x){
        // Приводим иксы в формат, который покажет одинаковые результаты на всех разрешениях экрана. ([-100;100])
        let functionalX = (x - width/2)/(width/2)*100;

        // Получаем универсальный Y из квадратного уравнения
        let functionalY = 100 - (a*functionalX*functionalX + b*functionalX + c);

        // Нас не интересует ситуация, когда Y не входит в [0;100]
        if (functionalY < 0 || functionalY > 100)
            continue;

        // Приводим Y в координату для нашего разрешения экрана
        let normalY = parseInt(height*(functionalY/100))

        // Заполняем квадрат 5*5, т.к. заполнение отдельны пикселей было бы слишком незаметно
        ctx.fillRect(x,normalY,5,5);
    }
    // Включаем звук нажатия на кнопку
    (new Audio('https://rpg.hamsterrepublic.com/wiki-images/8/8e/Confirm8-Bit.ogg')).play();
}

// Находим полотно и настраиваем его
const canvas = document.querySelector('.myCanvas');
const width = window.innerWidth;
const height =  window.innerHeight;

// Настраиваем контекст полотна
const ctx = canvas.getContext('2d');
ctx.canvas.width = width;
ctx.canvas.height=height;

// Устанавливаем фоновый цвет
ctx.fillStyle = 'wheat';
ctx.fillRect(0,0,width,height);

// Соглашаемся принимать клики
document.querySelector('button').onclick=handle;

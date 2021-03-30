
function checkTextSize(divHeight,div,interval,fatherHeight){
    // Считаем высоту одной строки
    let lineHeight = parseInt(div.style.lineHeight);

    // Считаем количество строк, которые могут вместиться в отцовский див
    let maxLines = parseInt(fatherHeight/lineHeight);

    // Считаем текущее количество строк
    let lines = divHeight / lineHeight;

    // Если мы больше не можем добавить строк, не даём более редактировать див и останавливаем запуск соответствующей
    // ему функции
    if (lines >=maxLines){
        div.setAttribute('contenteditable','false');
        clearInterval(interval);
    }
}

// Горизонтально расположенное текстовое окошко
let hor = document.querySelector('.hor');
let horFather = document.querySelector('.smallBox');
let horInterval = setInterval(function () {
    checkTextSize(hor.offsetHeight,hor,horInterval,horFather.clientHeight);
},10);

// Вертикально расположенное текстовое окошко
let vert = document.querySelector('.vert');
let vertFather = document.querySelector('.bigBox');
let vertInterval = setInterval(function () {
    checkTextSize(vert.offsetWidth,vert,vertInterval,vertFather.clientWidth);
},10);

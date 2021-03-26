
function checkTextSize(divHeight,div,interval,fatherHeight){
    let lineHeight = parseInt(div.style.lineHeight);
    let maxLines = parseInt(fatherHeight/lineHeight);
    let lines = divHeight / lineHeight;
    if (lines >=maxLines){
        div.setAttribute('contenteditable','false');
        clearInterval(interval);
    }
}


let hor = document.querySelector('.hor');
let horFather = document.querySelector('.smallBox');
let horInterval = setInterval(function () {
    checkTextSize(hor.offsetHeight,hor,horInterval,horFather.clientHeight);
},10);

let vert = document.querySelector('.vert');
let vertFather = document.querySelector('.bigBox');
let vertInterval = setInterval(function () {
    checkTextSize(vert.offsetWidth,vert,vertInterval,vertFather.clientWidth);

},10);

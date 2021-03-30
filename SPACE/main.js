
// Находим нашу картинку
let img =document.querySelector('img');

// Находим центр экрана
let center = [window.innerHeight/2,window.innerWidth/2];
img.onload = function() {

    // После загрузки картнки сдвигаем центр так, чтобы картинка была ровно в центре (мы перемещаем
    // не центр картинки, а её левый верхний угол)
    center[0]-=img.height/2;
    center[1]-=img.width/2;

    // Размещаем картинку
    img.style.top = center[0].toString() + 'px';
    img.style.left=center[1].toString() + 'px';

    // Делаем её видимой
    img.style.visibility='visible';
}

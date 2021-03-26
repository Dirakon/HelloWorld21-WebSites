
let img =document.querySelector('img');
let center = [window.innerHeight/2,window.innerWidth/2];
img.onload = function() {
    center[0]-=img.height/2;
    center[1]-=img.width/2;
    img.style.top = center[0].toString() + 'px';
    img.style.left=center[1].toString() + 'px';
    img.style.visibility='visible';
}

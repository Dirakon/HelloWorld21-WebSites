
let img =document.querySelector('img');
let center = [window.screen.availHeight/2,window.screen.availWidth/2];
center[0]-=img.height/2;
center[1]-=img.width/2;
img.style.top = center[0].toString() + 'px';
img.style.left=center[1].toString() + 'px';

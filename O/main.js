
clickDone = false

function handle(event){
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    if (!clickDone){
        ctx.moveTo(event.clientX, event.clientY);
        clickDone = true
    }else {
        ctx.lineTo(event.clientX, event.clientY);
        ctx.stroke();
        clickDone = false
    }
}
const canvas = document.querySelector('.myCanvas');
const width = window.innerWidth;
const height =  window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.canvas.width = width;
ctx.canvas.height=height;


ctx.fillStyle = 'wheat';
ctx.fillRect(0,0,width,height);

document.body.onclick=handle;

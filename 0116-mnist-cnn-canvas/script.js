let rawImage;
let ctx;
let pos = {x:0, y:0}


async function getModel(){
    model = await tf.loadLayersModel('indexeddb://my-model-1');
    return model;
}

function draw(){

}

function setPosition(e){
    pos.x = e.clientX - 100;
    pos.y = e.clientY - 100;
}

function preditct(){

}

function erase(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 280, 280)
}

function draw(e) {
    if(e.buttons != 1) return;
    ctx.beginPath();
    ctx.linWidth = 24;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
    ctx.moveto(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    rawImage.src = canvas.toDataURL("imgage/png");
}

function init(){
    const canvas = document.getElementById('canvas');
    rawIamge = document.getElementById('canvasimg');
    ctx = canvas.getContext("2d");
    erase();

    canvas.addEventListener("mousermove", draw);
    canvas.addEventListener("mousedown", setPosition);

    const predButton = document.getElementById('pb');
    const clearButton = document.getElementById('cb');
    predButton.addEventListener('click', predict);
    clearButton.addEventListener('click', erase);
}

async function run(){
    const model = await tf.loadLayersModel('indexeddb://my-model-1');
    init();
}

run();
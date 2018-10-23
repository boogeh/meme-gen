'use strict'

var gCanvas;
var gCtx;

function setCanvas() {
    gCanvas = document.querySelector('#main-canvas')
    gCanvas.style.width ='100%';
    // gCanvas.style.width ='';
    gCtx = gCanvas.getContext('2d')
}
 
function drawImage(img) {
    console.log(img)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

'use strict'

var gCanvas;
var gCtx;

function setCanvas() {
    gCanvas = document.querySelector('#main-canvas')
    gCanvas.width = '100%';
    gCtx = gCanvas.getContext('2d')
}
 
function drawImage(img) {
    console.log(img)
    gCtx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
        0, 0, gCanvas.width, gCanvas.height); 

    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

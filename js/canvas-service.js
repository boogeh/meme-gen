'use strict'

var gCanvas;
var gCtx;

function setCanvas() {
    var elCanvasDiv = document.querySelector('.canvas-container')
    gCanvas = document.querySelector('#main-canvas')
    gCanvas.width = elCanvasDiv.width;
    gCtx = gCanvas.getContext('2d')
}
 
function drawImage(img) {
    console.log(img)
    gCtx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                    0, 0, gCanvas.width, gCanvas.height); 

    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

'use strict'

var gCanvas;
var gCtx;

function setCanvas() {
    var elCanvasDiv = document.querySelector('.canvas-container')
    gCanvas = document.querySelector('#main-canvas')
    gCanvas.width = elCanvasDiv.clientWidth; // canvas width same as img width
    gCtx = gCanvas.getContext('2d')
}

function drawImage(img) {
    console.log(img)
    gCanvas.height = img.naturalHeight
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,     // source rectangle
                        0, 0, gCanvas.width, gCanvas.height);
}

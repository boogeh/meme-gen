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
    // canvas height same as img height
    gCanvas.height = img.clientHeight
    gCtx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
                        0, 0, gCanvas.width, gCanvas.height);
}

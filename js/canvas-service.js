'use strict'

var gCanvas;
var gCtx;

function setCanvas() {
    var elCanvasDiv = document.querySelector('.canvas-wrapper')
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

function backToGallery() {
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.gallery-container').classList.remove('hide');
}
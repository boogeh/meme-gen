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
    var ratio = img.naturalWidth / img.naturalHeight;
    gCanvas.height = gCanvas.width / ratio;
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
        0, 0, gCanvas.width, gCanvas.height);
}

function backToGallery() {
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.gallery-container').classList.remove('hide');
}
'use strict'

var gCanvas;
var gCtx;
var gSettings = {
    elImg: '',
    line1: '',
    line2: '',
    fontSize: '',
    strokeColor: '#000000',
    fillColor: '#ffffff',
    font: 'Arial'

}


function setCanvas() {
    var elCanvasDiv = document.querySelector('.canvas-wrapper')
    gCanvas = document.querySelector('#main-canvas')
    gCanvas.width = elCanvasDiv.clientWidth; // canvas width same as img width
    gCtx = gCanvas.getContext('2d')
}

function drawImage(elImg) {
    console.log(elImg)
    var ratio = elImg.naturalWidth / elImg.naturalHeight;
    gCanvas.height = gCanvas.width / ratio;
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight,
        0, 0, gCanvas.width, gCanvas.height);
    setFontSize()
    gSettings.elImg = elImg
}

function backToGallery() {
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.gallery-container').classList.remove('hide');
}

function changeText(text) {
    var elImg = gSettings.elImg
    drawImage(elImg)
    gSettings.line1 = text
    gCtx.font = gSettings.fontSize + 'px ' + gSettings.font
    gCtx.strokeStyle = gSettings.strokeColor
    gCtx.fillStyle = gSettings.fillColor
    gCtx.lineWidth = 7
    gCtx.strokeText(`${text}`, 70, 70)
    gCtx.fillText(`${text}`, 70, 70)
}

function setFontSize() {
    gSettings.fontSize = Math.round(gCanvas.height / 10)
}

function fontMinus(bookId) {
    console.log('minus hit');
    gSettings.fontSize--;
    // document.querySelector('.fontSize').innerText = gSettings.fontSize
}

function fontPlus(bookId) {
    console.log('minus hit');
    gSettings.fontSize++;
    // document.querySelector('.fontSize').innerText = gSettings.fontSize
}

// function getElImg(elImg) {
//     gSettings.elImg = elImg
// }
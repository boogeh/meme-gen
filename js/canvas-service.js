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
    gCanvas = document.querySelector('.main-canvas')
    gCanvas.width = elCanvasDiv.clientWidth; // canvas width same as img width
    gCtx = gCanvas.getContext('2d')
    setFontSize()
}

function drawImage(elImg) {
    var ratio = elImg.naturalWidth / elImg.naturalHeight;
    gCanvas.height = gCanvas.width / ratio;
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight,
        0, 0, gCanvas.width, gCanvas.height);
    gSettings.elImg = elImg
}

function backToGallery() {
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.gallery-container').classList.remove('hide');
}


function setText(elText) {
    var textLineId = elText['id'];
    var textLine = elText['value'];
    gSettings[textLineId] = textLine
    draw()
}
function draw() {
    var elImg = gSettings.elImg
    drawImage(elImg)
    gCtx.font = gSettings.fontSize + 'px ' + gSettings.font;
    gCtx.strokeStyle = gSettings.strokeColor;
    gCtx.fillStyle = gSettings.fillColor;
    gCtx.lineWidth = 5;
    gCtx.strokeText(gSettings.line1, 70, 70);
    gCtx.fillText(gSettings.line1, 70, 70);
    gCtx.strokeText(gSettings.line2, 70, gCanvas.height - 50);
    gCtx.fillText(gSettings.line2, 70, gCanvas.height - 50);
}

function setFontSize() {
    gSettings.fontSize = Math.round(gCanvas.width / 15);
}

function fontMinus() {
    gSettings.fontSize -= 2;
    draw();
}

function fontPlus() {
    gSettings.fontSize += 2;
    draw();
}

function setFillColor(elColor) {
    gSettings.fillColor = elColor;
    draw();
}

function setStrokeColor(elColor) {
    gSettings.strokeColor = elColor;
    draw();
}


function clearSettings() {
    gSettings = {
        elImg: '',
        line1: '',
        line2: '',
        fontSize: '',
        strokeColor: '#000000',
        fillColor: '#ffffff',
        font: 'Arial'
    }
}

function downloadCanvas(elLink) {
    console.log(gCanvas.toDataURL())
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'mem.jpg'
}

'use strict'

var gCanvas;
var gCtx;
var gSettings;
var gText = {
    line1: {
        x: 70,
        y: 70,
        txt: '',
    }, line2: {
        x: 70,
        y: 200,
        txt: '',
    },
}


function setCanvas() {
    var elCanvasDiv = document.querySelector('.canvas-wrapper')
    gCanvas = document.querySelector('.main-canvas')
    gCanvas.width = elCanvasDiv.clientWidth; // canvas width same as img width
    gCtx = gCanvas.getContext('2d')
    resetSettings();
    setFontSize();
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
    gText[textLineId].txt = textLine
    draw()
}
function draw() {
    var elImg = gSettings.elImg
    drawImage(elImg)
    gCtx.font = gSettings.fontSize + 'px ' + gSettings.font;
    gCtx.strokeStyle = gSettings.strokeColor;
    gCtx.fillStyle = gSettings.fillColor;
    gCtx.lineWidth = 5;
    gCtx.strokeText(gText.line1.txt, gText.line1.x, gText.line1.y);
    gCtx.fillText(gText.line1.txt, gText.line1.x, gText.line1.y);
    gCtx.strokeText(gText.line2.txt, gText.line2.x, gText.line2.y);
    gCtx.fillText(gText.line2.txt, gText.line2.x, gText.line2.y);
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


function resetSettings() {
    gSettings = {
        elImg: '',
        fontSize: '',
        strokeColor: '#000000',
        fillColor: '#ffffff',
        shadow: false,
        font: 'Arial',
    }
}

function downloadCanvas(elLink) {
    console.log(gCanvas.toDataURL())
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'mem.jpg'
}



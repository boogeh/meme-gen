'use strict'
var gPopularWords;
var gCanvas;
var gCtx;
var gMeme = {
    selectedElImg: null,
    txts: [
        {
            txt: '',
            size: 30,
            align: '',
            fillColor: '#ffffff',
            strokeColor: '#000000',
            font: 'impact',
            shadow: false,
            x: 150,
            y: 150,
            txtWidth: null,
        },
    ]
}

var gCurrText = gMeme.txts[0]


function setCanvas() {
    var elCanvasDiv = document.querySelector('.canvas-wrapper')
    gCanvas = document.querySelector('.main-canvas')
    gCanvas.width = elCanvasDiv.clientWidth; // canvas width same as img width
    gCtx = gCanvas.getContext('2d')
    // resetSettings();
}

function drawImage(elImg) {
    var ratio = elImg.naturalWidth / elImg.naturalHeight;
    gCanvas.height = gCanvas.width / ratio;
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight,
        0, 0, gCanvas.width, gCanvas.height);
    gMeme.selectedElImg = elImg
}

function backToGallery() {
    document.querySelector('.canvas-container').classList.add('hide');
    document.querySelector('.gallery-container').classList.remove('hide');
}


function setText(elText) {
    var textLine = elText.value;
    gCurrText.txt = textLine
    draw()
}
function draw() {
    var elImg = gMeme.selectedElImg
    drawImage(elImg)
    for (let i = 0; i < gMeme.txts.length; i++) {
        var currText = gMeme.txts[i]
        gCtx.font = currText.size + 'px ' + currText.font;
        gCtx.strokeStyle = currText.strokeColor;
        gCtx.fillStyle = currText.fillColor;
        gCtx.lineWidth = 5;
        currText.txtWidth = gCtx.measureText(currText.txt).width
        gCtx.strokeText(currText.txt, currText.x, currText.y);
        gCtx.fillText(currText.txt, currText.x, currText.y);
    }
}

function fontMinus() {
    gCurrText.size -= 2;
    draw();
}

function fontPlus() {
    gCurrText.size += 2;
    draw();
}

function setFillColor(elColor) {
    gCurrText.fillColor = elColor;
    draw();
}

function setStrokeColor(elColor) {
    gCurrText.strokeColor = elColor;
    draw();
}

function downloadCanvas(elLink) {
    console.log(gCanvas.toDataURL())
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'mem.jpg'
}

function moveUp() {
    gCurrText.y -= 10
    draw()
}
function moveDown(elBtn) {
    gCurrText.y += 10
    draw()
}
function moveLeft(elBtn) {
    gCurrText.x -= 10
    draw()
}
function moveRight(elBtn) {
    gCurrText.x += 10
    draw()
}

function newLine() {
    return {
        txt: 'New line',
        size: 30,
        align: '',
        fillColor: '#ffffff',
        strokeColor: '#000000',
        font: 'impact',
        shadow: false,
        x: 150,
        y: 150,
    }
}

function addLine() {
    var newLineTemplate = newLine()
    gMeme.txts.push(newLineTemplate)
    gCurrText = newLineTemplate
    draw()
}

function getCurrText() {
    return gCurrText
}

function controlLastText() {

}

function controlNextText() {

}


function canvasClick(ev) {
    var textLine = gMeme.txts.find(function (textLine) {
        // console.log(textLine);
        // console.log(ev.layerY)
        // console.log('layerX: ', ev.layerX, ' > textLine.x: ',textLine.x)
        // console.log('layerX: ', ev.layerX, ' < textLine.x: ',textLine.x + textLine.txtWidth)
        // console.log('layerY: ', ev.layerY, ' < textLine.y: ', textLine.y)
        // console.log('layerY: ', ev.layerY, ' > textLine.y: ',textLine.y + textLine.size)
        return (
            ev.layerX > textLine.x &&
            ev.layerX < textLine.x + textLine.txtWidth &&
            ev.layerY < textLine.y &&
            ev.layerY > textLine.y - textLine.size
        )
    })
    console.log(textLine)
    if (textLine) {
        gCurrText = textLine
    }
}

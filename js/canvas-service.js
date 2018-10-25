'use strict'
var gPopularWords;
var gCanvas;
var gCtx;
var gCurrText;
var gMeme;


function setCanvas() {
    var elCanvasDiv = document.querySelector('.canvas-wrapper')
    gCanvas = document.querySelector('.main-canvas')
    gCanvas.width = elCanvasDiv.clientWidth; // canvas width same as img width
    gCtx = gCanvas.getContext('2d')
}


function resetMeme() {
    gMeme = createMeme();
    gCurrText = gMeme.txts[0]
}


function createMeme() {
    return {
        selectedElImg: null,
        txts: [
            {
                txt: '',
                size: 40,
                align: '',
                fillColor: '#ffffff',
                strokeColor: '#000000',
                font: 'impact',
                shadow: true,
                x: 150,
                y: 150,
                txtWidth: null,
            },
        ]
    }
}

function drawImage(elImg) {
    var ratio = elImg.naturalWidth / elImg.naturalHeight;
    gCanvas.height = gCanvas.width / ratio;
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight,
        0, 0, gCanvas.width, gCanvas.height);
    gMeme.selectedElImg = elImg
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
        if (currText.shadow) {
            gCtx.lineWidth = 5
            gCtx.strokeText(currText.txt, currText.x, currText.y);
        } else {
            gCtx.lineWidth = 0;
        }
        currText.txtWidth = gCtx.measureText(currText.txt).width
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
    elLink.download = 'meme.jpg'
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

function shadowChange(elBox) {
    var checked = elBox.checked
    if (checked) {
        gCurrText.shadow = true;
    } else {
        gCurrText.shadow = false;
    }
    draw();
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


function canvasClick(ev) {
    var textLine = gMeme.txts.find(function (textLine) {
        return (
            ev.layerX > textLine.x &&
            ev.layerX < textLine.x + textLine.txtWidth &&
            ev.layerY < textLine.y &&
            ev.layerY > textLine.y - textLine.size
        )
    })
    if (textLine) {
        gCurrText = textLine
    }
}

'use strict'
var gPopularWords;
var gCanvas;
var gCtx;
var gCurrText;
var gMeme;
var gDrag = false;
var isLine = false;
var gDiffX;
var gDiffY;

var currX, currY, prevX, prevY = 0;


function setCanvas() {
    var elCanvasDiv = document.querySelector('.canvas-wrapper')
    gCanvas = document.querySelector('.main-canvas')
    gCanvas.width = elCanvasDiv.clientWidth; // canvas width same as img width
    gCtx = gCanvas.getContext('2d')
    mouseEventListener();
}

function mouseEventListener() {
    gCanvas.addEventListener("mousemove", function (ev) {
        mouseEvent('move', ev)
    });
    gCanvas.addEventListener("mousedown", function (ev) {
        mouseEvent('down', ev)
    });
    gCanvas.addEventListener("mouseup", function (ev) {
        mouseEvent('up', ev)
    });
    gCanvas.addEventListener("mouseout", function (ev) {
        mouseEvent('out', ev)
    });
}

function resetMeme() {
    gMeme = createMeme();
    gCurrText = gMeme.txts[0]
}

function createMeme() {
    return {
        selectedElImg: null,
        txts: [newLine()]
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

function mouseEvent(res, ev) {

    if (res === 'down' && (isLine)) {
        prevX = currX;
        prevY = currY;
        currX = gCurrText.x;
        currY = gCurrText.y;
        gDrag = true;
        gDiffX = Math.abs(gCurrText.x - ev.layerX);
        gDiffY = Math.abs(gCurrText.y - ev.layerY);
    }
    if (res === 'up' || res === "out") {
        gDrag = false;
    }
    if (res === 'move') {
        if (gDrag) {
            prevX = currX;
            prevY = currY;
            currX = ev.clientX - gCanvas.offsetLeft - gDiffX;
            currY = ev.clientY - gCanvas.offsetTop + gDiffY;
            moveLine();
        }
    }
}

function moveLine() {
    gCurrText.x = currX
    gCurrText.y = currY
    draw();

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

function findCurrTextIdx() {
    var textIdx = gMeme.txts.findIndex(txt => {
        return txt.id === gCurrText.id
    })
    return textIdx
}

function deleteText() {
    var txtIdx = findCurrTextIdx()
    gMeme.txts.splice(txtIdx, 1)
    if (!gMeme.txts.length) {
        addLine()
    }
    gCurrText = gMeme.txts[0]
    draw()
}

function shadowChange(elBox) {
    var checked = elBox.classList.contains('checked')
    if (checked) {
        gCurrText.shadow = true;
    } else {
        gCurrText.shadow = false;
    }
    draw();
}

function changeFont(font) {
    gCurrText.font = font
    draw()
}

function newLine() {
    return {
        id: generateId(),
        txt: '',
        size: 40,
        align: '',
        fillColor: '#ffffff',
        strokeColor: '#000000',
        font: 'impact',
        shadow: true,
        x: 150,
        y: 150,
    }
}

function addLine() {
    var newLineTemplate = newLine()
    gMeme.txts.push(newLineTemplate)
    gCurrText = newLineTemplate
    // draw()
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
        gCurrText = textLine;
        isLine = true;
    } else isLine = false;
}

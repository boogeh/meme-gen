'use strict'
var gPopularWords;
var gCanvas;
var gCtx;
var gSettings;
var gText =
{
    line1: {
        id: 'line1',
        txt: '',
        x: 70,
        y: 70,
    },
    line2: {
        id: 'line2',
        txt: '',
        x: 70,
        y: (400),
    },
}

var gMeme = {
    selectedElImg: null, // TODO
    txts: [
        {
            txt: '',
            size: 30,
            align: '',
            fillColor: '#ffffff',
            strokeColor: '#000000',
            font: 'Impact',
            shadow: false,
            x: 150,
            y: 150,
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
    // var textLineId = elText['id'];
    var textLine = elText.value;
    console.log(gCurrText.txt)
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
        gCtx.strokeText(currText.txt, currText.x, currText.y);
        gCtx.fillText(currText.txt, currText.x, currText.y);
    }
}

// function setFontSize() {
//     gCurrText.fontSize = Math.round(gCanvas.width / 15);
// }

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


// function resetSettings() {
//     gSettings = {
//         elImg: '',
//         line1: '',
//         line2: '',
//         fontSize: '',
//         strokeColor: '#000000',
//         fillColor: '#ffffff',
//         shadow: false,
//         font: 'Arial',
//     }
// }

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


function renderPopularKeywords() {

    var elSearchWord = document.querySelector('.dropdown-content')
    var keywords = [`<option selected="selected" value="all">All</option>`]
    for (let i = 0; i < 4; i++) {
        keywords.push( `<option  value="${gPopularWords[i][0]}">${gPopularWords[i][0]}</option>`)
    }
    elSearchWord.innerHTML = keywords.join('');
}

function mapByKeywords() {
    var popularWords = {};
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (!popularWords[keyword]) popularWords[keyword] = 1;
            else popularWords[keyword]++;
        })
    })
    return popularWords
}

function sortPopularWords() {
    var mapByPopular = mapByKeywords();
    var sortedPopular = [];
    for (var apearance in mapByPopular) {
        sortedPopular.push([apearance, mapByPopular[apearance]]);
    }

    sortedPopular.sort(function (b, a) {
        return a[1] - b[1];
    });
    gPopularWords = sortedPopular;

}

function drawCharts() {
    gStars.forEach((star, idx) => {
        gCtx.fillStyle = 'black';
        star.x = idx * (barWidth + 10);
        star.y = gCanvas.height - star.rate * heightFactor;
        gCtx.fillRect(star.x, star.y, barWidth, star.rate * heightFactor);
    });
}

// function canvasClicked(ev) {
//     var elModal = document.querySelector('.modal')

//     var textLine = gMeme.txts.find(function (textLine) {
//         return (
//             ev.clientX > textLine.x &&
//             ev.clientX < textLine.x + 100 &&
//             ev.clientY > textLine.y &&
//             ev.clientY < textLine.y + textLine.size
//         )
//     })
//     if (textLine) {
//         elModal.style.display = 'block'
//         elModal.innerText = 'Name: ' + textLine.name + ' Rate: ' + textLine.rate
//         elModal.style.top = ev.clientY + 'px'
//         elModal.style.left = ev.clientX + 'px'
//     } else {
//         elModal.style.display = 'none'
//     }
// }

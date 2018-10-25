'use strict'
var gPopularWords;
var gCanvas;
var gCtx;
var gSettings;
var gText = [
    {
        id: line1,
        txt: '',
        x: 70,
        y: 70,
    },
    {
        id: line2,
        txt: '',
        x: 70,
        y: (150),
    },

]


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
    gCtx.strokeText(gText[0].txt, 70, 70);
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


function resetSettings() {
    gSettings = {
        elImg: '',
        line1: '',
        line2: '',
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

function renderPopularKeywords() {

    var elSearchWord = document.querySelector('.dropdown-content')
    var keywords = [`<option selected="selected" value="all">All</option>`]
    for (let i = 0; i < 4; i++) {
        keywords.push( `<option  value="${gPopularWords[i][0]}">${gPopularWords[i][0]}</option>`)
    }
    console.log(elSearchWord);
    console.log(keywords.join(' '));

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

function canvasClicked(ev) {
    var elModal = document.querySelector('.modal')

    var textLine = gMeme.txts.find(function (textLine) {
        return (
            ev.clientX > textLine.x &&
            ev.clientX < textLine.x + 100 &&
            ev.clientY > textLine.y &&
            ev.clientY < textLine.y + textLine.size
        )
    })
    if (textLine) {
        elModal.style.display = 'block'
        elModal.innerText = 'Name: ' + textLine.name + ' Rate: ' + textLine.rate
        elModal.style.top = ev.clientY + 'px'
        elModal.style.left = ev.clientX + 'px'
    } else {
        elModal.style.display = 'none'
    }
}


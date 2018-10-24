'use strict'
var gPopularWords;
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
renderPopularKeywords();

function renderPopularKeywords() {
    var elSearchWord = document.querySelectorAll('.option-filler')
    console.log(elSearchWord);
    var options = []
    for (let i = 0; i < elSearchWord.length; i++) {
        options.push(`
        <option  value="${gPopularWords[i]}">${gPopularWords[i]}</option>
        `)
        elSearchWord.innerHtml(' ');
        console.log(elSearchWord);

    }

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


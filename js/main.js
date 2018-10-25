'use strict'

function init() {
    renderGallery();
    clearInputs();
    // sortPopularWords();
    // renderPopularKeywords();

}

function renderGallery() {
    var elGallery = document.querySelector('.gallery')
    var gallery = getImgs()
    var strHtmls = gallery.map(function (img) {
        return `<div class="image image-${img.id}">
                <img src="${img.url}" onclick="onImgSelect(this)"></img>
                </div>`
    })
    elGallery.innerHTML = strHtmls.join(' ')
}

function onImgSelect(elImg) {
    document.querySelector('.canvas-container').classList.remove('hide');
    document.querySelector('.gallery-container').classList.add('hide');
    clearInputs();
    setCanvas()
    drawImage(elImg);
}

function onBackBtn() {
    backToGallery();
}

function onSetText(elText) {
    setText(elText)
}

function onSetFillColor(elColor) {
    setFillColor(elColor)
}

function onSetStrokeColor(elColor) {
    setStrokeColor(elColor)
}

function clearInputs() {
    document.querySelector('.fill-color').value = ''   
    document.querySelector('.stroke-color').value = ''   
    document.querySelector('#line1').value = ''   
    // document.querySelector('#line2').value = ''
    document.querySelector('.shadow-checkbox').checked = false;
    // resetSettings()
}

function toggleMenu() {
    var nav = document.querySelector('.main-nav');
    nav.classList.toggle('open');
    var screen = document.querySelector('.screen');
    screen.classList.toggle('open')
    var hamburger = document.querySelector('.hamburger')
    if (hamburger.innerHTML === '<i class="fas fa-times"></i>')
        hamburger.innerHTML = '<i class="fas fa-bars"></i>'
    else hamburger.innerHTML= '<i class="fas fa-times"></i>';
}

function onMoveUp() {
    moveUp()
}

function onMoveDown() {
    moveDown()
}

function onMoveLeft() {
    moveLeft()
}

function onMoveRight() {
    moveRight()
}

function onAddLine() {
    addLine()
    renderInputs()
}

function renderInputs() {
    var currText = getCurrText()
    document.querySelector('.fill-color').value = currText.fillColor;
    document.querySelector('.stroke-color').value = currText.strokeColor;
    document.querySelector('.input-line').value = currText.txt;
    document.querySelector('.shadow-checkbox').checked = currText.shadow;
    document.querySelector('.font-picker').value = currText.font;
}

function onCanvasClick(ev) {
    canvasClick(ev)
    renderInputs()
}






function renderPopularKeywords() {

    var elSearchWord = document.querySelector('.dropdown-content')
    var keywords = [`<option selected="selected" value="all">All</option>`]
    for (let i = 0; i < 4; i++) {
        keywords.push( `<option  value="${gPopularWords[i][0]}">${gPopularWords[i][0]}</option>`)
    }
    elSearchWord.innerHTML = keywords.join('');
}

'use strict'

function init() {
    renderGallery();
    clearInputs();
    sortPopularWords();
    renderPopularKeywords();

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
    document.querySelector('#line2').value = ''
    document.querySelector('.shadow-checkbox').checked = false;
    resetSettings()
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


'use strict'

function init() {
    renderGallery()
    setCanvas()
}

function renderGallery() {
    var elGallery = document.querySelector('.gallery')
    var gallery = getImgs()
    var strHtmls = gallery.map(function (img) {
        return `<div class="image image-${img.id}">
                <img src="${img.url}" onclick="onImgSelect(this)"></img>
                </div>`
    })
    elGallery.innerHTML = strHtmls.join('')
}

function onImgSelect(elImg) {
    document.querySelector('.canvas-container').classList.remove('hide');
    document.querySelector('.gallery-container').classList.add('hide');
    
    setCanvas()
    drawImage(elImg);
}

function onBackBtn(){
    backToGallery();
}

function onChangeText(text) {
    changeText(text)
}
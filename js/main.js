'use strict'

function init() {
    renderGallery()
    setCanvas()
}

function renderGallery() {
    var elGallery = document.querySelector('.gallery')
    var gallery = getImgs()
    var strHtmls = gallery.map(function(img) {
        return `<img src="${img.url}" onclick="onImgSelect(this)">`
    })
    elGallery.innerHTML = strHtmls.join('')
}

function onImgSelect(img) {
    drawImage(img)
}
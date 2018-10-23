'use strict'

const IMG_COUNT = 25
var gId = 1
var gImgs = createImgs()

function createImgs() {
    var imgs = []
    for (let i = 1; i <= IMG_COUNT; i++) {
        imgs.push(createImg(`meme-imgs/${i}.jpg`, 'happy', 'funny'))
    }
    return imgs;
}

function createImg(url, ...keywords) {
    var img = {
        id: gId++,
        url,
        keywords,
    }
    return img
}

function getImgById(imgId) {
    var findImg = gImgs.find(function (img) {
        return imgId === img.id
    })
    return findImg;
}

function getImgs() {
    return gImgs
}

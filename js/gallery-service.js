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
        gId: gId++,
        url,
        keywords,
    }
    return img
}

function getImgs () {
    return gImgs
}

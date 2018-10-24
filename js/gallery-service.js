'use strict'


const IMG_COUNT = 25
var gId = 1
var gFilteredImg;
// var gImgs = createImgs()

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
    var findImg = gImgs.find(img => {
        return imgId === img.id
    })
    return findImg;
}

function getImgs() {
    if (gFilteredImg) return gFilteredImg;
    else return gImgs;
}

function filterGImgs(keyword) {
    gFilteredImg = gImgs.filter(img => {
        var keywords = img.keywords
        return keywords.some(word => {
            return (word.includes(keyword))
        })
    })
    if (keyword === 'all') gFilteredImg = gImgs

    renderGallery()
}

function filterByDropdown(keyword) {
    filterGImgs(keyword);

}

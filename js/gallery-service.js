'use strict'


const IMG_COUNT = 25
var gId = 1
var gFilteredImg;
var gImgs = createImgs()

function createImgs() {
    var imgs = [
    createImg('meme-imgs/1.jpg', 'happy', 'movie', 'music'),
    createImg('meme-imgs/2.jpg', 'trump', 'politics', 'finger'),
    createImg('meme-imgs/3.jpg', 'cute', 'animal', 'dog'),
    createImg('meme-imgs/4.jpg', 'cute', 'baby', 'animal', 'dog'),
    createImg('meme-imgs/5.jpg', 'cute', 'baby', 'mad'),
    createImg('meme-imgs/6.jpg', 'cute', 'animal', 'cat'),
    createImg('meme-imgs/7.jpg', 'funny', 'movie', 'hat'),
    createImg('meme-imgs/8.jpg', 'cute', 'evil', 'funny'),
    createImg('meme-imgs/9.jpg', 'happy', 'movie', 'you'),
    createImg('meme-imgs/10.jpg', 'mad', 'movie'),
    createImg('meme-imgs/11.jpg', 'happy', 'movie', 'music'),
    createImg('meme-imgs/12.jpg', 'happy', 'movie', 'hair'),
    createImg('meme-imgs/13.jpg', 'dance', 'cute', 'funny'),
    createImg('meme-imgs/14.jpg', 'trump', 'funny', 'mad', 'politics'),
    createImg('meme-imgs/15.jpg', 'happy', 'baby', 'surprise'),
    createImg('meme-imgs/16.jpg', 'dogs', 'funny', 'cute'),
    createImg('meme-imgs/17.jpg', 'happy', 'politics', 'obama'),
    createImg('meme-imgs/18.jpg', 'kiss', 'funny', 'smile'),
    createImg('meme-imgs/19.jpg', 'happy', 'movie', 'leonardo', 'drink'),
    createImg('meme-imgs/20.jpg', 'serious', 'movie'),
    createImg('meme-imgs/21.jpg', 'happy', 'movie'),
    createImg('meme-imgs/22.jpg', 'happy', 'oprah'),
    createImg('meme-imgs/23.jpg', 'funny', 'movie', 'startrek'),
    createImg('meme-imgs/24.jpg', 'putin', 'politics', 'evil'),
    createImg('meme-imgs/25.jpg', 'toystory', 'movie', 'woody', 'buzz')
]
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
<<<<<<< HEAD
    if(gFilteredImg) return gFilteredImg
    else return gImgs
=======
    if (gFilteredImg) return gFilteredImg;
    else return gImgs;
>>>>>>> 92c6386725abda1a7904d52e6815c7c53c1b8c25
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

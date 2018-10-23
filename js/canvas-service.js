'use strict'

var gCanvas;
var gCtx;

function setCanvas() {
    gCanvas = document.querySelector('#main-canvas')
<<<<<<< HEAD
    gCanvas.style.width ='100%';
=======
    gCanvas.width ='100%';
    // gCanvas.style.width ='';
>>>>>>> 0807bb985a117860c3da3fab3e3e3581890231d9
    gCtx = gCanvas.getContext('2d')
}
 
function drawImage(img) {
    console.log(img)
    gCtx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
        0, 0, gCanvas.width, gCanvas.height); 

    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

const gameCanvas = document.getElementById('canvas1')

function resizeAdjust() {
    const width = window.innerWidth
    const height = window.innerHeight

    const widthRatio = width/16
    const heightRatio = height/9
    
    if (widthRatio > heightRatio) {
        gameCanvas.height = height
        gameCanvas.width = heightRatio * 16
    }
    else {
        gameCanvas.width = width
        gameCanvas.height = widthRatio * 9
    }
}

resizeAdjust()

window.addEventListener('resize', resizeAdjust)
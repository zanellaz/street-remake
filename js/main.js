const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d')

const street = new Street()

const keysPressed = {}

streetPaths = 3

const keyActions = {
    ArrowLeft() {
        // console.table(street.paths[0].points)
        street.decreaseVelocityX()
    },
    ArrowRight() {
        street.increaseVelocityX()
    },
    KeyA() {
        streetPaths = 3
    },
    KeyS(){
        streetPaths = 4
    },
    KeyD() {
        streetPaths = 5
    },
    KeyZ() {
        street.velocityZ += 0.1
    }
}

document.addEventListener('keydown', ({ code }) => {
    const key = code
    if (keyActions[key] && !keysPressed[key]) {
        keysPressed[key] = true
    }
})

document.addEventListener('keyup', ({ code }) => {
    const key = code
    if (keysPressed[key]) {
        keysPressed[key] = false
    }
})

function handleKeys() {
    Object.keys(keysPressed).forEach(key => {
        if(keysPressed[key]) {
           keyActions[key]()
        }
    })
}

function handleStreet() {
    street.setPaths(streetPaths)
    street.adjustVelocityX()
    street.updatePoints()
    drawStreet()
}

function drawStreet() {
    context.fillStyle = 'grey'
    street.paths.forEach(path => {
        const { startLeft, startRight, endLeft, endRight } = path.points
        const { skyAdjust } = street
        context.beginPath()
        context.moveTo(startLeft, canvas.height)
        context.lineTo(startRight, canvas.height)
        context.lineTo(endRight, skyAdjust)
        context.lineTo(endLeft, skyAdjust)
        context.closePath()
        context.fill()
    })
}

function handleLand() {
    const { startLeft, endLeft } = street.paths[0].points
    const { startRight, endRight } = street.paths[street.paths.length-1].points
    const { skyAdjust } = street
    context.fillStyle = 'limegreen'
    context.beginPath()
    context.moveTo(startLeft, canvas.height)
    context.lineTo(0, canvas.height)
    context.lineTo(0, skyAdjust)
    context.lineTo(endLeft, skyAdjust)
    context.closePath()
    context.fill()
    context.beginPath()
    context.moveTo(canvas.width, canvas.height)
    context.lineTo(startRight, canvas.height)
    context.lineTo(endRight, skyAdjust)
    context.lineTo(canvas.width, skyAdjust)
    context.closePath()
    context.fill()
}

street.createLine()

function handleLines() {
    checkAmountOfLines()
    for (let i = 1; i < street.lines.length; i++) {
        const actualLine = street.lines[i];
        const lineBefore = street.lines[i-1]
        actualLine.start = lineBefore.end
        actualLine.adjustSizeByDistance()
        actualLine.updateEnd()
    }
    drawLines()
    street.lines[0].adjustSizeByDistance()
    street.lines[0].updateEnd()
    street.lines[0].updateVelocity()
}

let colorAdjust = false

function checkAmountOfLines() {
    const lastLine = street.lines[street.lines.length - 1]
    const firstLine = street.lines[0]
    const passedScreen = firstLine.end >= canvas.height
    const lastHasSize = lastLine.height > 0.1
    if (!!!lastHasSize) {
        street.lines.splice(street.lines.length, 1)
    }
    else {
        street.createLine()
    }
    if (passedScreen) {
        street.lines.splice(0, 1)
        street.lines[0].start = canvas.height + street.velocityZ
        colorAdjust = !colorAdjust
    }
}

function drawLines() {
    for (let i = 0; i < street.lines.length-1; i++) {
        const color = i % 2 == Number(colorAdjust) ? 'white' : 'grey'
        const line = street.lines[i];
        const { start, end } = line
        context.fillStyle = color
        context.beginPath()
        context.moveTo(0, start)
        context.lineTo(0, end);
        context.lineTo(canvas.width, end);
        context.lineTo(canvas.width, start);
        context.closePath();
        context.fill()
    }
}

createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener("tick", handleTick);


function handleTick(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!keysPressed['KeyZ'] && street.velocityZ > 0)
        street.velocityZ -= 0.3
    handleKeys()
    handleLines()
    handleStreet()
    handleLand()
    // console.log('a');
    // requestAnimationFrame(handleTick)
}

// requestAnimationFrame(handleTick)
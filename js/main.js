const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d')

const street = new Street()

const keysPressed = {}

const keyActions = {
    ArrowLeft() {
        console.log('left');
        street.decreaseVelocityX()
    },
    ArrowRight() {
        street.increaseVelocityX()
    },
    KeyA() {
        console.table(street.points)
    },
    KeyS(){
        // lanes = 4
    },
    KeyD() {
        // lanes = 5
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
    street.adjustVelocityX()
    street.updatePoints()
    drawStreet()
}

function drawStreet() {
    // const { leftStart, leftEnd, rightStart, rightEnd, floorEnd, floorStart } = street.points
    // context.fillStyle = "#ff0000";
    // context.moveTo(leftStart, floorStart);
    // context.lineTo(leftEnd, floorEnd);
    // context.lineTo(rightEnd, floorEnd);
    // context.lineTo(rightStart, floorStart);
    // context.closePath();
    // context.fill()
}


function handleLand() {

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
    console.table(street.lines)
}

let colorAdjust = false

function checkAmountOfLines() {
    const lastLine = street.lines[street.lines.length - 1]
    const firstLine = street.lines[0]
    const passedScreen = firstLine.end >= canvas.height
    const lastHasSize = lastLine.height > 1
    if (!!!lastHasSize) {
        street.lines.splice(street.lines.length, 1)
    }
    else {
        street.createLine()
    }
    if (passedScreen) {
        street.lines.splice(0, 1)
        street.lines[0].start = canvas.height + street.velocityZ
        // street.createLine()
        colorAdjust = !colorAdjust
    }
}

function drawLines() {
    for (let i = 0; i < street.lines.length-1; i++) {
        let color
        if (i % 2 == Number(colorAdjust)) {
            color = 'white'
        }
        else {
            color = 'black'
        }
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
    // handleStreet()
    handleLines()
    // handleLand()
    
    // console.log('a');
    // requestAnimationFrame(handleTick)
}

// requestAnimationFrame(handleTick)
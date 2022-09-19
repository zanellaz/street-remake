const canvas = document.getElementById('canvas1')
const context = canvas.getContext('2d')

const land = new Land()

const keysPressed = {}

const keyActions = {
    ArrowLeft() {
        // land.decreaseVelocityX()
    },
    ArrowRight() {
        // land.increaseVelocityX()
    },
    KeyA() {
        // lanes = 3
    },
    KeyS(){
        // lanes = 4
    },
    KeyD() {
        // lanes = 5
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

const { leftStart, leftEnd, rightStart, rightEnd } = land.points
const { floorEnd, floorStart } = land 

context.fillStyle='limegreen';
context.beginPath()
context.moveTo(leftStart, floorStart)
context.lineTo(leftEnd, floorEnd);
context.lineTo(rightEnd, floorEnd);
context.lineTo(rightStart, floorStart);
context.closePath();
// context.fill()


function animate() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    handleKeys()
    land.handleLines()
    // handleVeloX()
    // handleLanes()
    // handleStreet()
    requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
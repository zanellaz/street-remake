class Street {
    constructor() {
        this.color = `hsl(${ 2 }, 100%, ${ (2 % 2) * 100 }%)`;
        this.height = canvas.height/3
        this.skyAdjust = canvas.height - this.height
        this.perspectiveDiference = canvas.width / 5
        this.velocityX = 0
        this.velocityZ = 10
        const leftStart = 0 - this.perspectiveDiference
        const rightStart = canvas.width + this.perspectiveDiference
        this.points = {
            floorStart: canvas.height,
            floorEnd: this.skyAdjust,
            leftStart: leftStart,
            rightStart: rightStart,
            leftEnd: leftStart + canvas.width - this.perspectiveDiference * 2,
            rightEnd: rightStart - canvas.width + this.perspectiveDiference * 2,
        }
        this.lines = []
    }
    increaseVelocityX() {
        if (this.velocityX+1 < 50) {
            this.velocityX += 2
        }
    }
    decreaseVelocityX() {
        if (this.velocityX-1 > -50) {
            this.velocityX -= 2
        }
    }
    adjustVelocityX() {
        if (this.velocityX > 0) {
            this.velocityX--
        }
        if (this.velocityX < 0) {
            this.velocityX++
        }
    }
    updatePoints() {
        this.points.leftStart += this.velocityX
        this.points.rightStart += this.velocityX
        this.points.leftEnd += this.velocityX/15
        this.points.rightEnd += this.velocityX/15
    }
    createLine() {
        this.lines.push(new StreetLine())
    }
}
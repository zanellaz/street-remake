class Street {
    constructor() {
        this.color = `hsl(${ 2 }, 100%, ${ (2 % 2) * 100 }%)`;
        this.height = canvas.height/6
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

        this.sizeStart = this.points.rightStart - this.points.leftStart
        this.sizeEnd = this.points.rightEnd - this.points.leftEnd

        this.paths = []
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
    setPaths(amountOfPaths) {
        this.paths = []
        for (let i = 0; i < amountOfPaths+1; i++) {
            const path = new StreetPath()
            const pathsDrawnBefore = i
            path.setPoints(pathsDrawnBefore, amountOfPaths)
            this.paths.push(path)
        }
    }
    updatePaths() {
        for (let i = 0; i < this.paths.length; i++) {
            const path = this.paths[i]
            path.points.leftStart += this.velocityX
            path.points.rightStart += this.velocityX
            path.points.leftEnd += this.velocityX/15
            path.points.rightEnd += this.velocityX/15
        }
    }
}
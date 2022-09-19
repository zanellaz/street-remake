class Land {
    constructor() {
        this.color
        this.height = canvas.height/6
        this.skyAdjust = canvas.height - this.height
        this.floorStart = canvas.height
        this.floorEnd = this.skyAdjust
        this.perspectiveDiference = canvas.width / 5
        const leftStart = 0 - this.perspectiveDiference
        const rightStart = canvas.width + this.perspectiveDiference
        this.points = {
            leftStart: leftStart,
            rightStart: rightStart,
            leftEnd: leftStart + canvas.width - this.perspectiveDiference * 2,
            rightEnd: rightStart - canvas.width + this.perspectiveDiference * 2,
        }
        this.lines = []
    }
    handleLines() {
        if (this.lines[0]) {
            const firstLine = this.lines[0]
            const { leftStart } = firstLine.points
            if (leftStart < canvas.height) {
                this.createLine()
            }
            else {
                this.lines[0].splice(0, 1)
            }
            for (let i = 0; i < this.lines.length; i++) {
                // console.log(this.lines);
                const line = this.lines[i];
                if (i < this.lines.lenght - 1) { // lastLine
                    line.handleDistanceToNext(this.lines[i+1]) 
                }
                else {
                    line.increaseDistance()
                    console.log(i);
                    console.log(this.lines.length - 1);
                }
                context.fillStyle=`hsl(${ i }, 100%, 50%)`;
                context.beginPath()
                context.moveTo(leftStart, floorStart)
                context.lineTo(leftEnd, floorEnd);
                context.lineTo(rightEnd, floorEnd);
                context.lineTo(rightStart, floorStart);
                context.closePath();
                context.fill()
            }
        }
        else {
            this.createLine()
        }
    }
    createLine() {
        this.lines.push(new LandLine)
    }
}
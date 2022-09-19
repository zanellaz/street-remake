class LandLine {
    constructor() {
        const { leftStart, leftEnd, rightStart, rightEnd } = land.points
        this.points = {
            leftStart: leftEnd,
            rightStart: rightEnd,
            leftEnd: leftEnd,
            rightEnd: rightEnd
        }
        this.pointsDifference = leftEnd - leftStart
    }
    increaseDistance() {
        this.points.leftStart += 1
        this.points.rightStart += 1
        this.points.leftEnd += 2
        this.points.rightEnd += 2
    }
    handleDistanceToNext(lineAfter) {
        console.log(lineAfter);
        const { leftStart, leftEnd, rightStart, rightEnd } = lineAfter.points
        this.points.leftStart += leftStart
        this.points.rightStart += rightStart
        this.points.leftEnd += leftEnd
        this.points.rightEnd += rightEnd
    }
}
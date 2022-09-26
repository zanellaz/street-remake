class StreetLine {
    constructor() {
        this.start = canvas.height
        this.height = (this.start - street.skyAdjust)/2
        this.end = this.start - this.height
    }
    updateVelocity() {
        this.start += street.velocityZ * canvas.height/1000 + street.velocityZ * (this.start - canvas.height)/210 // GAMBIARRA MAGNIFICA CHUTEI ATÉ DAR CERTO
    }
    adjustSizeByDistance() {
        this.height = (this.start - street.skyAdjust)/2
    }
    updateEnd() {
        this.end = this.start - this.height
    }
}
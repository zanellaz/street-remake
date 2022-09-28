class StreetPath {
    constructor() {
        this.sizeStart = street.sizeStart
        this.sizeEnd = street.sizeEnd

        this.points = {
            startLeft: 0,
            startRight: 0,
            endLeft: 0,
            endRight: 0
        }
    }
    setPoints(pathsBefore, amountOfPaths) {
        const { leftStart, leftEnd } = street.points
        const pathStart = this.sizeStart/(amountOfPaths+2) //I don't know why "+2"
        const pathEnd = this.sizeEnd/(amountOfPaths+2)
        this.sizeStart = pathStart/amountOfPaths
        this.sizeEnd = pathEnd/amountOfPaths 
        const beforePathStart = leftStart + pathStart*pathsBefore + this.sizeStart*pathsBefore
        const beforePathEnd = leftEnd + pathEnd*pathsBefore + this.sizeEnd*pathsBefore
        this.points = {
            startLeft: beforePathStart,
            startRight: beforePathStart + this.sizeStart*amountOfPaths,
            endLeft: beforePathEnd,
            endRight: beforePathEnd + this.sizeEnd*amountOfPaths
        }
    }
}
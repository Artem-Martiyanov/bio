export default class Figure {
    constructor(facetSize, position) {
        this.model = {
            position,
            body: []
        }
    }
    direction = 1
    setPosition(x, y) {
        this.model.body.forEach(side => {
            this.model.position.x = side.offset.x + x
            this.model.position.y = side.offset.y + y
        })
    }
    isInclude(x, y) {
        let result = false;
        const figure = this.model.body[0].figure
        let j = figure.length - 1
        for (let i = 0; i < figure.length; i++) {
            let jX = figure[j][0] + this.model.position.x
            let jY = figure[j][1] + this.model.position.y
            let iX = figure[i][0] + this.model.position.x
            let iY = figure[i][1] + this.model.position.y
            if ((((iY <= y) && (y < jY)) || ((jY <= y) && (y < iY))) && (x > (jX - iX) * (y - iY) / (jY - iY) + iX)) {
                result = !result
            }
            j = i;
        }
        return result;
    }
}

import Figure from '../Figure/Figure';

export default class Cube extends Figure {
  constructor(facetSize, colors, position) {
    super()
    this.model = {
      position,
      body: [
        {
          figure: [
            [0, 0],
            [facetSize, 0],
            [facetSize, facetSize],
            [0, facetSize]
          ],
          offset: {
            x: 0,
            y: 0,
          },
          color: {
            fill: colors[0]?.fill || null,
            stroke: colors[0]?.stroke || null
          },
          isClose: true
        },
        
        {
          figure: [
            [0, 0],
            [facetSize * 0.25, facetSize * 0.25],
            [facetSize * 0.25, facetSize * 1.25],
            [0, facetSize]
          ],
          offset: {
            x: facetSize,
            y: 0,
          },
          color: {
            fill: colors[1]?.fill || null,
            stroke: colors[1]?.stroke || null
          },
          isClose: false
        },
        
        {
          figure: [
            [0, 0],
            [facetSize, 0],
            [facetSize * 1.25, facetSize * 0.25],
            [facetSize * 0.25, facetSize * 0.25]
          ],
          offset: {
            x: 0,
            y: facetSize,
          },
          color: {
            fill: colors[2]?.fill || null,
            stroke: colors[2]?.stroke || null
          },
          isClose: false
        }
      ]
    }
  }
}

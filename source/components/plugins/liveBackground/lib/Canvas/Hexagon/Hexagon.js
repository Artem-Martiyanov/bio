import Figure from '../Figure/Figure';

export default class Hexagon extends Figure {
  constructor(facetSize, colors, position) {
    super()
    this.model = {
      position,
      body: [
        {
          figure: [
            [0, 0],
            [facetSize * 0.35, facetSize * -0.75],
            [facetSize * 1.35, facetSize * -0.75],
            [facetSize * 0.7 + facetSize, 0],
            [facetSize * 1.35, facetSize * 0.75],
            [facetSize * 0.35, facetSize * 0.75],
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
            [facetSize * 0.7, facetSize * 1.5],
            [facetSize * 0.35, facetSize * 2.2],
            [facetSize * -0.35, facetSize * 0.75],
          
          ],
          offset: {
            x: facetSize * 1.7,
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
            [facetSize * 1.7, facetSize * 1.45],
            [facetSize * 0.7, facetSize * 1.45],
          
          ],
          offset: {
            x: facetSize * 0.35,
            y: facetSize * 0.75,
          },
          color: {
            fill: colors[2]?.fill || null,
            stroke: colors[2]?.stroke || null
          },
          isClose: false
        },
      ]
    }
  }
}
import {createElement} from '../../helpers/helpers';
import './Canvas.css'

export default class Canvas {
  constructor(width, height) {
    this.WIDTH = width
    this.HEIGHT = height
    this.wrapper = createElement('div', 'canvas__wrapper')
    this.canvas = this.#createCanvas(width, height)
    this.wrapper.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
  }

  #createCanvas = (width, height) => {
    const $canvas = createElement('canvas', 'canvas')
    $canvas.width = width
    $canvas.height = height
    $canvas.style = `width: ${width}px; height: ${height}px;`
    $canvas.ondragstart = () => false
    return $canvas
  }

  clear() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT)
  }

  render({position, body}) {
    body.forEach(side => {
      const curX = +position.x + +side.offset.x || 0
      const curY = +position.y + +side.offset.y || 0
      this.ctx.beginPath()
      this.ctx.moveTo(curX, curY)
      side.figure.forEach(([x, y]) => {
        this.ctx.lineTo(curX + x, curY + y)
      })
      if (side.isClose) {
        this.ctx.closePath()
      }
      if (side.color) {
        if (side.color.fill) {
          this.ctx.fillStyle = side.color.fill
          this.ctx.fill()
        }
        if (side.color.stroke) {
          this.ctx.strokeStyle = side.color.stroke
          this.ctx.stroke()
        }
      } else {
        this.ctx.fillStyle = this.ctx.strokeStyle = 'black'
        this.ctx.fill()
        this.ctx.stroke()
      }
    })
  }

  destroy() {
    this.wrapper.parentNode.removeChild(this.wrapper)
  }
}

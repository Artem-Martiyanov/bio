import Canvas from './lib/Canvas/Canvas';
import Cube from './lib/Canvas/Cube/Cube';
import {getRandom} from './helpers/helpers';
import Hexagon from './lib/Canvas/Hexagon/Hexagon';

export class LiveBackground {
  /**
   * Анимированный задний фон
   *
   * @description Чтобы использовать, необходимо добавить аттрибут 'data-background' на
   *              HTML элемент, которому хотим анимированный фон. В index.js создать инстанс данного класса,
   *              в конструктор передать параметры.
   *
   * @param {String} mode - Вид фигуры ['cube', 'hex']
   * @param {Number} cellSize - Размер фигуры [40...100]
   * @param {Array<Object>} cellColors - Массив цветов сторон (по часовой стрелке, начиная с лицевой)
   * @param {String} cellColors[].fill - Цвет заливки стороны
   * @param {String} cellColors[].stroke - Цвет обводки стороны
   * @param {Number} movSpeed - Скорость перемещения [3...7]
   */
  constructor(mode = 'cube', cellSize, cellColors, movSpeed) {
    this.parent = document.querySelector('[data-background]')
    if (this.parent) {
      this.parentWidth = this.parent.clientWidth
      this.parentHeight = this.parent.clientHeight
      this.facetSize = cellSize
      this.countCellsX = Math.ceil(this.parentWidth / this.facetSize) + 1
      this.countCellsY = Math.ceil(this.parentHeight / this.facetSize) + 2
      this.canvasWidth = this.countCellsX * this.facetSize
      this.canvasHeight = this.countCellsY * this.facetSize
      this.canvas = new Canvas(this.canvasWidth, this.canvasHeight)
      this.cellColors = cellColors
      this.speed = movSpeed / 100
      this.mode = mode
      this.cells = this.#createCellsArray()
      requestAnimationFrame(this.#draw.bind(this))
      document.addEventListener('pointermove', this.#pointerHandler.bind(this))
      
      this.parent.style.overflow = 'hidden'
      this.parent.insertAdjacentElement('afterbegin', this.canvas.wrapper)
    }
  }
  
  #pointerHandler(e) {
    if (this.mode === 'cube') {
      this.mouseX = Math.floor(e.x / this.facetSize)
      this.mouseY = Math.floor(e.y / this.facetSize)
    } else {
      this.mouseX = Math.floor(e.x)
      this.mouseY = Math.floor(e.y)
    }
  }
  
  #createCellsArray() {
    const cells = []
    if (this.mode === 'cube') {
      for (let y = 0; y < this.canvasHeight; y += this.facetSize) {
        const line = []
        for (let x = 0; x < this.canvasWidth; x += this.facetSize) {
          const offset = getRandom(-1, this.facetSize * 0.15).toFixed(2)
          const pos =
            {
              x: x - offset,
              y: y - offset
            }
          line.push(new Cube(this.facetSize, this.cellColors, pos))
        }
        cells.push(line)
      }
    }
    if (this.mode === 'hex') {
      for (let y = 0; y < this.canvasHeight; y += this.facetSize * 1.5) {
        const line = []
        for (let x = 0; x < this.canvasWidth; x += this.facetSize * 1.35) {
          const offset = getRandom(-1, this.facetSize * 0.15).toFixed(2)
          let calcY = 0
          if (x / ((this.facetSize * 1.35)) % 2 === 0) {
            calcY = y + this.facetSize * 0.75
          } else {
            calcY = y
          }
          const pos =
            {
              x: x - offset,
              y: calcY - offset
            }
          line.push(new Hexagon(this.facetSize, this.cellColors, pos))
        }
        cells.push(line)
      }
    }
    return cells
  }
  
  #update() {
    this.cells.forEach((line, y) => {
      line.forEach((cell, x) => {
        let offset = this.speed * cell.direction
        
        let positionDifference = 0
        let k = 1
        if (this.mode === 'hex') {
          k = 1.35
        }
        positionDifference = cell.model.position.x - x * this.facetSize * k
        
        // Выбор направления движения фигур
        if (positionDifference < getRandom(this.facetSize * 0.1, this.facetSize * 0.15) * -1) {
          cell.direction = -1
        } else if (positionDifference > 0) {
          cell.direction = 1
        }
        
        // Выбор логики обработки наведения мыши
        cell.hovered = (this.mode === 'cube') ?
          (x === this.mouseX && y === this.mouseY)
          :
          cell.isInclude(this.mouseX, this.mouseY)
        
        
        if (cell?.hovered && positionDifference < this.facetSize * 0.1) {
          cell.model.position.x += 4
          cell.model.position.y += 4
        }
        
        if (!cell?.hovered) {
          cell.model.position.y -= offset
          cell.model.position.x -= offset
        }
      })
    })
  }
  
  #draw() {
    this.canvas.clear()
    this.#update()
    this.cells.forEach(line => {
      line.forEach(cell => {
        this.canvas.render(cell.model)
      })
    })
    requestAnimationFrame(this.#draw.bind(this))
  }
  
  destroy() {
    document.removeEventListener('pointermove', this.#pointerHandler)
    this.canvas.destroy()
  }
}





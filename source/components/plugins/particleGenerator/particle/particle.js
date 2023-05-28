import './particle.css'

const generateRandomNum = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))

const createParticle = (size, sizeDispersion, color) => {
  if (size <= sizeDispersion) {
    throw new Error(`sizeDispersion: ${sizeDispersion} should not be more than size: ${size}`)
  }
  const particle = document.createElement('div')
  const delta = generateRandomNum(-2, 2)
  particle.classList.add('particle')
  particle.style.width = size + delta + 'px'
  particle.style.height = size + delta + 'px'
  particle.style.background = color
  return particle
}

const createCircle = (radius, color, shadow) => {
  const style = `
    border-radius: 50%;
    width: ${radius}vmax;
    height: ${radius}vmax;
    border: 3px solid ${color};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    box-shadow: ${shadow} 0 0 150px 10px ${color};
  `
  
  const circle = document.createElement('div')
  circle.style = style
  document.body.insertAdjacentElement('afterbegin', circle)
}

export class Particle {
  /**
   * Частица
   *
   * @description Частица создаётся с псевдослучайным translate по X и Y осям и сразу движется
   *              к точке смещения, после окончания transition, частица удаляется.
   *              - Регулировать время жизни частицы в CSS файле.
   *              - Не рекомендуется ставить большое время жизни, это спровоцирует высокую
   *              нагрузку на CPU и GPU, т.к. частицы не знают и не контролируют их общее количество.
   *
   * @param {Number} size - Базовый размер частицы (px) [3...infinity]
   * @param {Number} sizeDispersion - Разброс размера частицы (px) [0...particleSize - 1]
   * @param {String} color - Цвет частицы [hex, rgb, rgba, hsl]
   * @param {Number} targetMinRadius - Нижняя граница места рендера частиц [0...100]
   * @param {Number} targetMaxRadius - Верхняя граница места рендера частиц [0...100]
   * @param {String} mode - Режим настройки ['setting']
   */
  constructor(size, sizeDispersion, color, targetMinRadius, targetMaxRadius, mode) {
    this.parent = document.querySelector('[data-particle-effect]')
    this.minRadius = targetMinRadius
    this.maxRadius = targetMaxRadius
    if (this.parent) {
      if (mode === 'setting') {
        createCircle(targetMinRadius * 2, 'red', '')
        createCircle(targetMaxRadius * 2, 'blue', 'inset')
      } else {
        this.particle = createParticle(size, sizeDispersion, color)
        this.parent.insertAdjacentElement('afterbegin', this.particle)
        window.setTimeout(() => this.#move(), 0)
        this.particle.addEventListener('transitionend', this.#destroy)
      }
    }
  }
  
  #move() {
    const radius = generateRandomNum(this.minRadius, this.maxRadius)
    const angle = generateRandomNum(0, 360)
    this.particle.style.transform = `rotateZ(${angle}deg) translateX(${radius}vmax)`
    this.particle.style.opacity = '0'
  }
  
  #destroy(e) {
    if (e.target.parentNode) {
      e.target.parentNode.removeChild(e.target)
    }
  }
}
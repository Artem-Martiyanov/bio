import {getRandom} from '../../utils';

const settings = {
  starsCount: 350,
}
const wrapper = document.querySelector('[data-bg="space"]')

if (wrapper) {
  const canvasInit = (width, height) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.style = `width: ${width}px; height: ${height}px; z-index: -50;`
    canvas.ondragstart = () => false
    wrapper.appendChild(canvas)
    return canvas.getContext('2d')
  }
  const renderStar = (x, y, radius, color, opacity) => {
    c.beginPath()
    c.arc(x, y, radius, 0, Math.PI * 2, true)
    c.fillStyle = color + opacity
    c.fill()
  }

  const createStarsArray = (starsCount) => {
    let stars = []
    while (starsCount >= 0) {
      const star = {
        radius: getRandom(0.1, 2.2),
        opacity: getRandom(0.3, 0.5) + ')',
        color: `rgba(${getRandom(200, 255)}, ${getRandom(200, 255)}, ${getRandom(210, 255)}, `,
        position: {
          x: getRandom(0, wrapper.clientWidth),
          y: getRandom(0, wrapper.clientHeight),
        },
      }
      stars.push(star)
      starsCount--
    }
    return stars
  }

  const loop = (curFramesTime) => {
    if (!prevFramesTime) {
      prevFramesTime = curFramesTime
    }
    if (curFramesTime - prevFramesTime >= delay) {
      c.clearRect(0, 0, wrapper.clientWidth, wrapper.clientHeight)
      stars.forEach((star) => {
        renderStar(star.position.x, star.position.y, star.radius, star.color, star.opacity)
        star.opacity = getRandom(0.3, 0.5) + ')'
      })
      prevFramesTime = curFramesTime
    }
    window.requestAnimationFrame(loop)
  }

  const stars = createStarsArray(settings.starsCount)

  let prevFramesTime = null
  const delay = 15

  const c = canvasInit(wrapper.clientWidth, wrapper.clientHeight)
  window.requestAnimationFrame(loop)
}






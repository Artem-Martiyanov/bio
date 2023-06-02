const wrapper = document.querySelector('[data-parallax="wrapper"]')
const layers = document.querySelectorAll('[data-parallax="layer"]')

const handleParallax = (evt) => {
  // Размер области просмотра
  const parallaxLeftOffset = wrapper.getBoundingClientRect().left
  const parallaxTopOffset = wrapper.getBoundingClientRect().top

  // Координаты центра экрана
  const coordX = evt.clientX - parallaxLeftOffset - 0.5 * wrapper.offsetWidth
  const coordY = evt.clientY - parallaxTopOffset - 0.5 * wrapper.offsetHeight

  layers.forEach((layer) => {

    const layerSpeed = layer.dataset.speed
    const x = -(coordX * layerSpeed).toFixed(2)
    const y = -(coordY * layerSpeed).toFixed(2)

    layer.setAttribute('style', `transform: translate(${x}px, ${y}px);`)
  })
}

const reset = () => {
  layers.forEach((layer) => {
    layer.removeAttribute('style')
    layer.style = 'transition: transform 0.3s linear;'
  })
}


if (wrapper && layers) {
  wrapper.addEventListener('pointermove', handleParallax)
  wrapper.addEventListener('pointerout', reset)
}



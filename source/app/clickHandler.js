/**
 * Обработка кликов во всем приложении
 */

import store from '../store/instance';

import Burger from '../components/burger';
import Dialog from '../components/dialog';
import Electrician from '../components/electrician';
import Switcher from '../components/switcher';
import Lamp from '../components/lamp';
import Works from '../components/works';
import Cat from '../components/cat';

let switchCount = 0

const onClickHandler = (event) => {
  const dataType = event.target.dataset.type

  if (dataType === 'morpheus') {
    Dialog.show()
  }

  if (dataType === 'burger' || dataType === 'nav' || event.target.closest('[data-type="burger"]')) {
    Burger.toggle()
  }

  if (dataType === 'switcher-control') {
    Lamp.toggle()
    if (switchCount >= 1) {
      Electrician.show()
    }

    if (switchCount > 4) {
      Switcher.disable()
      Lamp.change(() => {
        Switcher.enable()
        Electrician.reset()
        switchCount = 0
      })
    }
    switchCount++
  }

  if (event.target.closest('.works__link')) {
    const card = event.target.closest('.works__inner')
    const id = card.querySelector('.works__link').getAttribute('href')

    if (localStorage.getItem(id) !== 'viewed') {
      store.actions.works.iterateView(id).then(() => {
        localStorage.setItem(id, 'viewed')
        Works.iterateView(card)
      })
    }
  }


  if (dataType === 'cat-tail') {
    document.ondragstart = () => false
    const moveHandler = (ev) => {
      document.addEventListener('pointerup', upHandler)

      const pointerOffsetXPercent = ev.clientX / document.documentElement.clientWidth * 100

      // Предел смещения кота
      const isOffsetLimit = ev.clientX > Cat.el.clientWidth * 2

      // Если предел смещения не достигнут
      if (!isOffsetLimit) {
        const savedClawsOffset = Number(localStorage.getItem('clawOffset')) ?? null
        const currentClawsOffset = (ev.clientX - Cat.el.clientWidth * 1.25) / 2

        // Если нужно сместить когти
        if (!savedClawsOffset || savedClawsOffset < currentClawsOffset) {
          Cat.moveClaws(currentClawsOffset)
          localStorage.setItem('clawOffset', currentClawsOffset.toString())
        }

        Cat.move((ev.clientX - Cat.tail.clientWidth / 2) / 2)
      }
    }
    const upHandler = () => {
      console.log('up')
      document.removeEventListener('pointermove', moveHandler)
      document.removeEventListener('pointerup', upHandler)

      // Возвращаем кота
      Cat.goBack()
    }

    Cat.ready()
    document.addEventListener('pointermove', moveHandler)
  }


  console.log(event.target)
  if (dataType === 'fix-claws') {
    Cat.fixClawsPath()
  }

}

export function initClickHandle() {
  document.addEventListener('pointerdown', onClickHandler)
}

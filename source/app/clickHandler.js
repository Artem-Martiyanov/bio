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
import Reviews from '../components/reviews';

let switchCount = 0

const onClickHandler = (event) => {
  const dataType = event.target.dataset.type

  if (dataType === 'morpheus') {
    Dialog.show()
  }

  if (dataType === 'burger' || dataType === 'nav') {
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
    const upHandler = () => {
      document.removeEventListener('pointermove', moveHandler)
      document.removeEventListener('pointerup', upHandler)

      // Возвращаем кота
      Cat.goBack()
    }

    document.addEventListener('pointerup', upHandler)
    const moveHandler = (ev) => {
      // Смещение указателя относительно точки клика
      const pointerOffset = ev.clientX - event.clientX

      // Предел смещения кота
      let isOffsetLimit = pointerOffset > Cat.el.clientWidth * 2.5 // 2.5 ширины кота
      if (document.documentElement.clientWidth < 500) {
        isOffsetLimit = pointerOffset > Cat.el.clientWidth * 1.5
      }
      // Если предел смещения не достигнут
      if (!isOffsetLimit) {
        const savedClawsOffset = Number(localStorage.getItem('clawOffset')) ?? null
        let catPeeking = Cat.el.clientWidth * 0.36  // 36%, на которые выглядывает хвост кота
        let decelerationFactor = 0.5 // Коэффициент отрицательно приращения позиции кота

        if (document.documentElement.clientWidth < 500) {
          decelerationFactor = 1
          catPeeking = Cat.el.clientWidth * -0.35
        }
        const currentClawsOffset = (pointerOffset - Cat.el.clientWidth - catPeeking) * decelerationFactor

        // Если нужно сместить когти
        if (!savedClawsOffset || savedClawsOffset < currentClawsOffset) {
          Cat.moveClaws(currentClawsOffset)
          localStorage.setItem('clawOffset', currentClawsOffset.toString())
        }
        Cat.move(pointerOffset * decelerationFactor)
      }
    }

    Cat.ready()
    document.addEventListener('pointermove', moveHandler)
  }


  if (dataType === 'fix-claws') {
    Cat.fixClawsPath()
  }

  if (dataType === 'delete-review') {
    const id = event.target.dataset.id

    store.actions.reviews.remove(id).then(() => Reviews.render())
  }
}

export function initClickHandle() {
  document.addEventListener('pointerdown', onClickHandler)
}

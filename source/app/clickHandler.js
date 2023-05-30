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
}

export function initClickHandle() {
  document.addEventListener('mousedown', onClickHandler)
}

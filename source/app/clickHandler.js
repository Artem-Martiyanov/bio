/**
 * Обработка кликов во всем приложении
 */

import Burger from '../components/burger';
import Dialog from '../components/dialog';
import Electrician from '../components/electrician';
import Switcher from '../components/switcher';
import Lamp from '../components/lamp';
import {isInCookie} from '../components/utils';

let switchCount = 0

const onClickHandler = (event) => {
  const dataType = event.target.dataset.type

  if (dataType === 'morpheus') {
    Dialog.show()
  }

  if (dataType === 'burger' || dataType === 'nav' || event.target.closest('[data-type="burger"]')) {
    Burger.toggle()
  }

  if (dataType === 'lamp-switcher') {
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
    const title = card.querySelector('.works__title').innerText
    if (localStorage.getItem(title) !== '1') {
      localStorage.setItem(title, '1')
      const counter = card.querySelector('.works__counter')
      counter.innerText = Number(counter.innerText) + 1
      // логика по отправке данных счётчика на сервер и перерисовке всего списка работ с обнолвенными данными
    }
  }
}

export function initClickHandle() {
  document.addEventListener('click', onClickHandler)
}

/**
 * Обработка кликов во всем приложении
 */

import Burger from '../components/burger';
import Dialog from '../components/dialog';
import Electrician from '../components/electrician';
import Switcher from '../components/switcher';
import Lamp from '../components/lamp';

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
}

export function initClickHandle() {
  document.addEventListener('click', onClickHandler)
}

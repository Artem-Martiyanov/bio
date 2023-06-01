/**
 * Обработка скролла во всем приложении
 */

import Header from '../components/header';

const onScroll = () => {

  if (window.scrollY > 5) {
    Header.darken()
  } else {
    Header.lighten()
  }

}

export function initScrollHandle() {
  window.onload = onScroll
  document.addEventListener('scroll', onScroll)
}

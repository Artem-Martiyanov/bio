/**
 * Обработка загрузки страницы
 */
import Cat from '../components/cat';
import Form from '../components/form';

const onLoadHandler = (event) => {
  if (Cat.el) {
    Cat.onload()
  }
  if (Form.el) {
    Form.onLoad()
  }
}

export function initLoadHandler() {
  window.addEventListener('load', onLoadHandler)
}

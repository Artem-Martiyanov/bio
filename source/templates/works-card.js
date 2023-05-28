import {convertToWebp} from '../components/utils';

export const WorksCard = (params) => {
  const card = document.createElement('li')
  card.classList.add('works__item')
  card.innerHTML = `
        <div class="works__content">
          <picture>
            <source srcset="${convertToWebp(params.image)}">
            <img class="works__image" src="${params.image}" alt="${params.title}.">
          </picture>
          <div class="works__inner">
            <h2 class="works__title"><span>&#60; </span>${params.title}<span> &#62;</span></h2>
            <p class="works__description">${params.description}</p>
            <footer class="works__links">
              <a class="works__link" href="${params.deployLink}" target="_blank">
                <span class="visually-hidden">Опубликованная версия.</span>
                <svg width="40" height="40">
                  <use href="./images/stack.svg#out-link"></use>
                </svg>
              </a>
              <a class="works__link" href="${params.ghLink}" target="_blank">
                <span class="visually-hidden">Проект на гитхаб.</span>
                <svg width="40" height="40">
                  <use href="./images/stack.svg#github"></use>
                </svg>
              </a>
              <span class="works__view">
                <span class="visually-hidden">Количество просмотров.</span>
                <span class="works__counter">${params.view}</span>
              </span>
            </footer>
          </div>
        </div>
  `
  return card
}

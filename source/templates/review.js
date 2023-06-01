import {isMyReview} from '../components/utils';

export const Review = (params) => {
  const review = document.createElement('li')
  review.classList.add('reviews__item')
  review.innerHTML = `
        <header class="reviews__header">
          <h2 class="reviews__title">${params?.userName}</h2>
          ${params.userCompany && `<p class="reviews__company">${params?.userCompany}</p>`}
          ${isMyReview(params.id) ? `
          <button class="reviews__remove" type="button" title="Удалить." data-type="delete-review" data-id="${params.id}">
            <span class="visually-hidden">Удалить отзыв.</span>
          </button>
          ` : ''}
        </header>
        <p class="reviews__content">${params?.content}</p>
        <footer class="reviews__footer">
        ${(params.userTelegram || params.userVkontakte) && `
          <ul class="reviews__social">
            ${params.userTelegram && `
            <li class="reviews__social-item" title="Телеграм комментатора.">
              <a class="reviews__social-link reviews__social-link--telegram" href="${params.userTelegram}" target="_blank">
                <span class="visually-hidden">Телеграм комментатора.</span>
              </a>
            </li>
            `}
            ${params.userVkontakte && `
            <li class="reviews__social-item" title="Вконтакте комментатора.">
              <a class="reviews__social-link reviews__social-link--vkontakte" href="${params.userVkontakte}" target="_blank">
                <span class="visually-hidden">Вконтакте комментатора.</span>
              </a>
            </li>
            `}
          </ul>
          `}
          <b class="reviews__rating">${params.rating}
            <span class="reviews__rating-max"> / 10</span>
          </b>
          <span class="reviews__date">
          ${params.date}
          </span>
        </footer>
  `
  return review
}

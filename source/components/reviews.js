import store from '../store/instance';
import {Review} from '../templates/review';

const Reviews = {
  el: document.querySelector('.reviews__list'),

  render: function () {

    const reviewsList = store.actions.reviews.getList()

    this.el.innerHTML = ''

    if (reviewsList.length > 0) {
      reviewsList.map(review => {
        let date = new Date(review.date).toLocaleString().split(',').reverse()
        date.splice(1, 0, ' - ')
        date = date.join('')

        review.date = date
        this.el.appendChild(Review(review))
      })
    } else {
      const emptyText = document.createElement('h2')
      emptyText.classList.add('reviews__empty')
      emptyText.innerText = 'Пока нет ни одного отзыва :('
      this.el.appendChild(emptyText)
    }
  },
}

export default Reviews

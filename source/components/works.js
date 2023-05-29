import store from '../store/instance';
import {WorksCard} from '../templates/works-card';

const Works = {
  el: document.querySelector('.works'),

  render: function () {
    if (this.el) {
      store.actions.works.getList().map(cardInfo => {
        this.el.appendChild(WorksCard(cardInfo))
      })
    }
  },

  iterateView: function (card) {
    const counter = card.querySelector('.works__counter')
    counter.innerText = Number(counter.innerText) + 1
  }
}

export default Works

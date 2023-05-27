import {store} from '../store/store';
import {WorksCard} from '../templates/works-card';

const Works = {
  el: document.querySelector('.works'),
  
  render: function () {
    if (this.el) {
      store.worksCards.map(cardInfo => {
        this.el.appendChild(WorksCard(cardInfo))
      })
    }
  }
}


export default Works
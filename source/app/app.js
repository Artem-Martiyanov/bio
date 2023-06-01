import Works from '../components/works';
import store from '../store/instance';
import Cat from '../components/cat';
import Reviews from '../components/reviews';
import Form from '../components/form';
import {pushReviewToLocalStorage} from '../components/utils';

const App = {
  render: async function () {
    if (Works.el) {
      store.actions.works.load().then(() => {
        Works.render()
      })
    }

    if (Reviews.el) {
      store.actions.reviews.load().then(() => Reviews.render())

      Form.listen((data) => {
        store.actions.reviews.upload(data)
          .then((response) => {
            response.json().then(id => pushReviewToLocalStorage(id.name))
            return store.actions.reviews.load()
          })
          .then(() => Reviews.render())
      })
    }

    if (Cat.el) {
      Cat.init()
    }
  }
}
export default App

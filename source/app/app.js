import Works from '../components/works';
import store from '../store/instance';
import Cat from '../components/cat';

const App = {
  render: function () {
    if (document.querySelector('.works')) {
      store.actions.works.load().then(() => {
        Works.render()
      })
    }

    if (Cat.el) {
      Cat.init()
    }
  }
}
export default App

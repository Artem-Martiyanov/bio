import Works from '../components/works';
import store from '../store/instance';

const App = {
  render: function () {
    store.actions.works.load().then(() => {
      Works.render()
    })
  }
}
export default App

import './sass/styles.scss'
import initPlugins from './components/plugins/instances';
import {initClickHandle} from './app/clickHandler';
import {initScrollHandle} from './app/scrollHandle';
import App from './app/app';
import Store from './store/store';


initPlugins()
initClickHandle()
initScrollHandle()

App.render()


const store = new Store()
store.actions.works.load().then(() => {
   const list = store.actions.works.getList()


})

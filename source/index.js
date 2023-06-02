
import './sass/styles.scss'
import initPlugins from './components/plugins/instances';
import {initClickHandle} from './app/clickHandler';
import {initScrollHandle} from './app/scrollHandle';
import App from './app/app';
import {initLoadHandler} from './app/loadHandler';


initPlugins()
initClickHandle()
initScrollHandle()
initLoadHandler()

App.render()



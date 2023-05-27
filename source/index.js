import './sass/styles.scss'
import initPlugins from './components/plugins/instances';
import {initClickHandle} from './app/clickHandler';
import {initScrollHandle} from './app/scrollHandle';
import App from './app/app';

initPlugins()
initClickHandle()
initScrollHandle()

App.render()

/**
 * Здесь перечисляются и настраиваются используемые плагины
 * */

import {LiveBackground} from './liveBackground/LiveBackground';
import {ParticleGenerator} from './particleGenerator/ParticleGenerator';


export default function initPlugins() {
  return [
    new LiveBackground(
      'cube',
      window.innerWidth >= 768 ? 80 : 50,
      [{fill: '#175b39', stroke: '#2fa86b'}, {fill: '#43f59c'}, {fill: '#0d3321'}],
      5
    ),
    new ParticleGenerator(
      15,
      10,
      '#43f59c',
      250,
      20,
      50,
      ''
    )
  ]
  
}


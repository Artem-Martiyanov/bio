import {Particle} from './particle/particle';export class ParticleGenerator {    /**   * Генератор частиц   *   * @description Чтобы использовать, необходимо добавить аттрибут 'data-particle-effect' на   *              HTML элемент, из !центра которого будут вылетать частицы. В index.js создать   *              инстанс данного класса, в конструктор передать параметры.   *              Одна частица генерируется каждый свободный кадр, учитывая задержку spawnDelay.   *   * @param {Number} particleSize - Базовый размер частицы (px) [3...infinity]   * @param {Number} particleSizeDispersion - Разброс размера частицы (px) [0...particleSize - 1]   * @param {String} particleColor - Цвет частицы [hex, rgb, rgba, hsl]   * @param {Number} spawnDelay - Задержка рендера частиц (ms) [0...infinity]   */  constructor(particleSize, particleSizeDispersion, particleColor, spawnDelay = 100) {    this.prevFramesTime = null    this.spawnDelay = spawnDelay    this.settings = [      particleSize,      particleSizeDispersion,      particleColor    ]    window.requestAnimationFrame(this.#render.bind(this))  }    #render(curFramesTime) {    if (!this.prevFramesTime) {      this.prevFramesTime = curFramesTime    }        if (curFramesTime - this.prevFramesTime >= this.spawnDelay) {      new Particle(...this.settings)      this.prevFramesTime = curFramesTime    }    window.requestAnimationFrame(this.#render.bind(this))  }}
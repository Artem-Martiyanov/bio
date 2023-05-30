import * as modules from './exports'

/**
 * Инициализирует все модули из реэкспорта,
 * раздаёт контекст для каждого модуля и начальное состояние, описанное в модуле
 */
class Store {

  constructor(initState = {}) {
    this.state = initState

    /** @type {{
     * works: Works,
     * }} */
    this.actions = {};
    for (const name of Object.keys(modules)) {
      this.actions[name] = new modules[name](this, name);
      this.state[name] = this.actions[name].initState();
    }

  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState
  }
}

export default Store

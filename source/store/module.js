/**
 * Базовый класс для модулей хранилища (направляет информацию по контексту обращения)
 *
 * Базовые методы работы с REST помещают в хранилище и достают из него данные в их изначальном виде.
 * В дочерних классах можно определить методы, трансформирующие данные для удобства, но возвращать в
 * хранилище их надо в их изначальном виде
 */

class StoreModule {
  constructor(store, name) {
    this.store = store
    this.name = name
    this.url = `https://portfolio-ee6bc-default-rtdb.europe-west1.firebasedatabase.app/${this.name}.json`
  }

  initState() {
    return {}
  }

  /**
   * @description Получение состояния хранилища [this.name] модуля
   * @return {Object}
   */
  getState() {
    return this.store.getState()[this.name]
  }

  /**
   * @description Установка состояния хранилища [this.name] модуля
   * @param {Object} newState
   */
  setState(newState) {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: newState
    })
  }

  /**
   * @description Загрузка и установка в хранилище [this.name] данных ИЗ сервера
   */
  async load() {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch(this.url, settings)
      this.setState(await response.json())
    } catch (e) {
      console.error(`Error. Method "load": ${e.message}`)
      console.table(this)
    }
  }

  /**
   * @description Загрузка и установка в хранилище [this.name] данных НА сервера
   * @param {Object} data
   */
  async upload(data) {
    const settings = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      await fetch(this.url, settings)
    } catch (e) {
      console.error(`Error. Method "upload": ${e.message}`)
      console.table(this)
      console.log(data)
    }
    this.setState({
      ...this.getState(),
      ...data
    })
  }

  /**
   * @description Изменение на сервере и в хранилище [this.name] данных
   * @param {Object} newData
   * @return {Promise}
   */
  async update(newData) {
    const settings = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    }
    this.setState({
      ...this.getState(),
      ...newData
    })
    try {
      return await fetch(this.url, settings)
    } catch (e) {
      console.error(`Error. Method "update": ${e.message}`)
      console.table(this)
      console.log(newData)
    }
  }
}


export default StoreModule

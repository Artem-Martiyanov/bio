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
    this.url = (path = '') => `https://portfolio-ee6bc-default-rtdb.europe-west1.firebasedatabase.app/${this.name}/${path}.json`
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
  async load(id = '') {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch(this.url(id), settings)
      const data = await response.json()

      id === '' ?
        this.setState(data)
        :
        this.setState({
          ...this.getState(),
          [id]: data
        })


      return data
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
      const response = await fetch(this.url(), settings)
      const id = await response.json()
      this.setState({
        ...this.getState(),
        [id.name]: data
      })
      return id.name
    } catch (e) {
      console.error(`Error. Method "upload": ${e.message}`)
      console.table(this)
      console.log(data)
    }
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
      return await fetch(this.url(), settings)
    } catch (e) {
      console.error(`Error. Method "update": ${e.message}`)
      console.table(this)
      console.log(newData)
    }
  }

  /**
   * @description Удаление данных [this.name] на сервере и в хранилище по id
   * @param {String} id
   * @return {Promise}
   */
  async remove(id) {
    const settings = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const trash = 'https://portfolio-ee6bc-default-rtdb.europe-west1.firebasedatabase.app/trash.json'
    try {
      await fetch(trash, {
        method: 'POST',
        body: JSON.stringify(this.getState()[id])
      })
    } catch (e) {
      console.error(`Error. Method "post": ${e.message}`)
      console.table(this)
      console.log(id)
    }
    delete this.getState()[id]
    try {
      return await fetch(this.url(id), settings)
    } catch (e) {
      console.error(`Error. Method "delete": ${e.message}`)
      console.table(this)
      console.log(id)
    }
  }
}


export default StoreModule

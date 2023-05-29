/**
 * Базовый класс для модулей хранилища
 */

class StoreModule {
  constructor(store, name) {
    this.store = store
    this.name = name
    this.url = 'https://portfolio-ee6bc-default-rtdb.europe-west1.firebasedatabase.app/'
  }

  initState() {
    return {}
  }

  getState() {
    return this.store.getState()[this.name]
  }

  setState(newState) {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: newState
    })
  }

  async load() {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(`${this.url}${this.name}.json`, settings)
    this.setState(await response.json())
  }

  async upload(data) {
    const settings = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await fetch(`${this.url}${this.name}.json`, settings)
    this.setState({
      ...this.getState(),
      ...data
    })
  }

  async update(newData) {
    const settings = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    }
    return await fetch(`${this.url}${this.name}.json`, settings)
  }
}


export default StoreModule

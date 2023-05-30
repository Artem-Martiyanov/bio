import StoreModule from '../module';

class Works extends StoreModule {

  initState() {
    return {}
  }

  getList() {
    const state = this.getState()
    return Object.keys(state).map(key => {
      return {...state[key], id: key}
    })
  }

  async iterateView(id) {
    let item = this.getList().find(item => item.deployLink === id)
    const state = this.getState()
    const data = {
      [item.id]: {
        ...state[item.id],
        view: ++item.view
      }
    }
    await this.update(data)
  }


}

export default Works

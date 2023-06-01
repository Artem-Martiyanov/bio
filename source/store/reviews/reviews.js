import StoreModule from '../module';

class Reviews extends StoreModule {

  initState() {
    return {}
  }

  getList() {
    const state = this.getState()


    return !state ? [] : Object.keys(state).map(key => {
      return {...state[key], id: key}
    })
  }


}

export default Reviews

// @flow
import * as Redux from 'redux'
import {Reducer} from './Reducers'

let STORE = Redux.createStore(Reducer, {})
export const LOG_REDUX = false

export let createStore = (state: Object = {}) => {
  STORE = Redux.createStore(Reducer, state)
  return STORE
}

export default {
  dispatch: (action: Object): Promise<Object> => {
    if (!action) return Promise.reject(new Error('Should have action'))
    return Promise.resolve(STORE.dispatch(action))
  },
  getState: (): Object => STORE.getState()
}

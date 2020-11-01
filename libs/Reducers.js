// @flow
import {combineReducers} from 'redux'
import AppReducer from '../reducers/AppReducer'

export let Reducer = combineReducers({
  appState: AppReducer
})

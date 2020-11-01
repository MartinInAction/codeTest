// @flow
'use strict'
import React, {PureComponent} from 'react'
import {AppRegistry} from 'react-native'
import {Provider} from 'react-redux'
import {createStore} from './libs/Store'
import AppContainer from './components/AppContainer'

type Props = {}
type State = {}

const store = createStore()
let App = class extends PureComponent<Props, State> {
  render (): React$Element<Object> {
    return <Provider store={store}>
      <AppContainer />
    </Provider>
  }
}
AppRegistry.registerComponent('codeTest', () => App)

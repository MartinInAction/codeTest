// @flow
import React, {PureComponent} from 'react'
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native'
import StartContainer from '../components/StartContainer'
import colors from '../libs/Colors'
import BracketsContainer from '../components/BracketsContainer'
import Store from '../libs/Store'
import {connect} from 'react-redux'
type Props = {}
type State = {}

class AppContainer extends PureComponent<Props, State> {
    state = {}

    componentDidMount () {}

    render (): React$Node {
      let {appState} = Store.getState()
      let {bracketsArray} = appState
      return <>
        <StatusBar barStyle='light-content' />
        <SafeAreaView style={styles.container}>
          {bracketsArray && bracketsArray.length > 0 ? <BracketsContainer /> : <StartContainer />}
        </SafeAreaView>
      </>
    }
}

export default connect(state => state)(AppContainer)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mud,
    flex: 1
  }
})

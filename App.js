// @flow
import React, {PureComponent} from 'react'
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native'
import StartContainer from './components/StartContainer'
import colors from './libs/Colors'
import BracketsContainer from './components/BracketsContainer'
type Player = {
  name: string,
  id: number
}
type Props = {}
type State = {
  bracketsArray?: Array<Player>,
  tournamentName: string
}
export default class App extends PureComponent<Props, State> {
  state = {
    bracketsArray: undefined,
    tournamentName: ''
  }

  componentDidMount () {
    this.createBracket('test', 16)
  }

  render (): React$Node {
    let {bracketsArray, tournamentName} = this.state
    return <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        {bracketsArray ? <BracketsContainer tournamentName={tournamentName} bracket={bracketsArray} /> : <StartContainer createBracket={this.createBracket} />}
      </SafeAreaView>
    </>
  }

  createBracket = (tournamentName: string, numberOfPlayers: number) => {
    let bracketsArray = [this.groupPlayers2and2(this.createPlayers(numberOfPlayers))]
    let numberOfFields = this.createPlayers(numberOfPlayers).length / 4
    while (numberOfFields > 0) {
      bracketsArray.push(this.crateBracketFieldOfPlayers(this.createPlayers(numberOfPlayers), numberOfFields))
      numberOfFields--
    }
    bracketsArray.push(this.createWinnerRow())
    this.setState({bracketsArray, tournamentName})
  }

  createPlayers = (numberOfPlayers: number) => {
    return Array(numberOfPlayers).fill(0).map((player, index) => ({name: '', id: index}))
  }

  groupPlayers2and2 = (players: Array<Object>) => {
    let arrays = []
    let size = 2
    while (players.length > 0) arrays.push(players.splice(0, size))
    return arrays
  }

  crateBracketFieldOfPlayers = (players: Array<Object>, numberOfFields: number) => {
    let groupN = []
    players = players.splice(0, numberOfFields * 2)
    while (numberOfFields > 0) {
      // players.splice(0, 1)
      groupN.push(...this.groupPlayers2and2(players))
      numberOfFields--
    }
    return groupN
  }

  createWinnerRow = () => {
    return this.groupPlayers2and2([{name: '', id: 100}])
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
})

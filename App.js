// @flow
import React, {PureComponent} from 'react'
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native'
import StartContainer from './components/StartContainer'
import colors from './libs/Colors'
import BracketsContainer from './components/BracketsContainer'
type Player = {
  name: string,
  id: number,
  didWin?: boolean,
  firstRow: boolean
}
type Props = {}
type State = {
  bracketsArray?: Array<*>,
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
        {bracketsArray ? <BracketsContainer updatePlayer={this.updatePlayer} tournamentName={tournamentName} bracket={bracketsArray} /> : <StartContainer createBracket={this.createBracket} />}
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

  updatePlayer = (updatedPlayer: Player): Promise<*> => {
    let {bracketsArray} = this.state
    let group = bracketsArray[0].find((groups) => {
      return groups.find((player) => {
        return player.id === updatedPlayer.id
      })
    })
    let indexOfGroup = bracketsArray[0].indexOf(group)
    let newGroup = group.map((player) => {
      if (player.id === updatedPlayer.id) return updatedPlayer
      if (updatedPlayer.didWin) player = {...player, didWin: false}
      return player
    })
    bracketsArray[0][indexOfGroup] = newGroup
    this.setState({bracketsArray: [...bracketsArray]})
    if (updatedPlayer.didWin) return this.makeWinner(updatedPlayer)
    return Promise.resolve()
  }

  makeWinner = (updatedPlayer: Player): Promise<*> => {
    let {bracketsArray} = this.state
  }

  createPlayers = (numberOfPlayers: number) => {
    return Array(numberOfPlayers).fill(0).map((player, index) => ({name: `PlayerId: ${index}`, id: index, firstRow: true}))
  }

  groupPlayers2and2 = (players: Array<Object>) => {
    let arrays = []
    let size = 2
    while (players.length > 0) arrays.push(players.splice(0, size))
    return arrays
  }

  crateBracketFieldOfPlayers = (players: Array<Object>, numberOfFields: number) => {
    let groupN = []
    players = players.map((player) => ({...player, name: '', firstRow: false}))
    players = players.splice(0, numberOfFields * 2)
    while (numberOfFields > 0) {
      // players.splice(0, 1)
      groupN.push(...this.groupPlayers2and2(players))
      numberOfFields--
    }
    return groupN
  }

  createWinnerRow = () => {
    return this.groupPlayers2and2([{name: 'WINNER', id: 100}])
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
})

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
  row: boolean
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
    this.createBracket('Tournament', 8)
  }

  render (): React$Node {
    let {bracketsArray, tournamentName} = this.state
    return <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        {bracketsArray ? <BracketsContainer reset={this.reset} updatePlayer={this.updatePlayer} tournamentName={tournamentName} bracket={bracketsArray} /> : <StartContainer createBracket={this.createBracket} />}
      </SafeAreaView>
    </>
  }

  createBracket = (tournamentName: string, numberOfPlayers: number) => {
    let bracketsArray = [this.groupPlayers2and2(this.createPlayers(numberOfPlayers))]
    let numberOfFields = this.createPlayers(numberOfPlayers).length / 4
    let row = 2
    while (numberOfFields > 0) {
      bracketsArray.push(this.crateBracketFieldOfPlayers(this.createPlayers(numberOfPlayers), numberOfFields, row))
      numberOfFields--
      row++
    }
    bracketsArray.push(this.createWinnerRow(row))
    this.setState({bracketsArray, tournamentName})
  }

  createPlayers = (numberOfPlayers: number) => {
    return Array(numberOfPlayers).fill(0).map((player, index) => ({name: `PlayerId: ${index}`, id: index, row: 1}))
  }

  groupPlayers2and2 = (players: Array<Object>) => {
    let arrays = []
    let size = 2
    while (players.length > 0) arrays.push(players.splice(0, size))
    return arrays
  }

  crateBracketFieldOfPlayers = (players: Array<Object>, numberOfFields: number, row: number) => {
    let groupN = []
    players = players.map((player) => ({...player, name: '', row}))
    players = players.splice(0, numberOfFields * 2)
    while (numberOfFields > 0) {
      // players.splice(0, 1)
      groupN.push(...this.groupPlayers2and2(players))
      numberOfFields--
    }
    return groupN
  }

  createWinnerRow = (row: number) => {
    return this.groupPlayers2and2([{name: '', id: 100, row}])
  }

  updatePlayer = (updatedPlayer: Player): Promise<*> => {
    let {bracketsArray} = this.state
    let group = bracketsArray[updatedPlayer.row - 1].find((groups) => {
      return groups.find((player) => {
        return player.id === updatedPlayer.id
      })
    })
    let indexOfGroup = bracketsArray[updatedPlayer.row - 1].indexOf(group)
    let newGroup = group.map((player) => {
      if (player.id === updatedPlayer.id) return {...player, name: updatedPlayer.name, didWin: updatedPlayer.didWin}
      if (updatedPlayer.didWin) player = {...player, didWin: false}
      return player
    })
    bracketsArray[updatedPlayer.row - 1][indexOfGroup] = newGroup
    this.setState({bracketsArray: [...bracketsArray]})
    if (updatedPlayer.didWin) return this.makeWinner(updatedPlayer)
    return Promise.resolve()
  }

  makeWinner = (updatedPlayer: Player): Promise<*> => {
    let {bracketsArray} = this.state
    let nextGroup = bracketsArray[updatedPlayer.row].find((groups) => {
      return groups.find((player) => {
        return player.name === ''
      })
    })
    let firstEmptyGroupIndex = bracketsArray[updatedPlayer.row].indexOf(nextGroup)
    let firstEmptyPlayer = nextGroup.find((player) => player.name === '')
    let firstEmptyPlayerIndex = nextGroup.indexOf(firstEmptyPlayer)
    nextGroup[firstEmptyPlayerIndex] = {...firstEmptyPlayer, name: updatedPlayer.name}
    bracketsArray[updatedPlayer.row][firstEmptyGroupIndex] = nextGroup
    this.setState({bracketsArray: [...bracketsArray]})
  }

  reset = () => this.setState({bracketsArray: undefined})
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mud,
    flex: 1
  }
})

// @flow
import Store from './Store'
import * as Actions from './Actions'

export let createBracket = (tournamentName: string, numberOfPlayers: number) => {
  let bracketsArray = [groupPlayers2and2(createPlayers(numberOfPlayers))]
  let numberOfFields = createPlayers(numberOfPlayers).length / 4
  let row = 2
  while (numberOfFields > 0) {
    bracketsArray.push(crateBracketFieldOfPlayers(createPlayers(numberOfPlayers), numberOfFields, row))
    numberOfFields--
    row++
  }
  bracketsArray.push(createWinnerRow(row))
  Store.dispatch(Actions.createBracket(bracketsArray, tournamentName))
}

export let createPlayers = (numberOfPlayers: number): Array<Player> => {
  let players: Array<Player> = Array(numberOfPlayers).fill(0)
  return players.map((player, index) => ({name: `PlayerId: ${index}`, id: index, row: 1}))
}

export let groupPlayers2and2 = (players: Array<Player>) => {
  let arrays: Array<Player> = []
  let size = 2
  // $FlowFixMe
  while (players.length > 0) arrays.push(players.splice(0, size))
  return arrays
}

export let crateBracketFieldOfPlayers = (players: Array<Object>, numberOfFields: number, row: number) => {
  let groupN = []
  players = players.map((player) => ({...player, name: '', row}))
  players = players.splice(0, numberOfFields * 2)
  while (numberOfFields > 0) {
    // players.splice(0, 1)
    groupN.push(...groupPlayers2and2(players))
    numberOfFields--
  }
  return groupN
}

export let createWinnerRow = (row: number) => {
  return groupPlayers2and2([{name: '', id: 100, row}])
}

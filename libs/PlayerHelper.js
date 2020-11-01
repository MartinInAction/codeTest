// @flow
import Store from '../libs/Store'
import * as Actions from '../libs/Actions'
export let updatePlayer = (updatedPlayer: Player): Promise<*> => {
  let {appState} = Store.getState()
  let {bracketsArray} = appState
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
  Store.dispatch(Actions.createBracket(bracketsArray))
  if (updatedPlayer.didWin) return makeWinner(updatedPlayer)
  return Promise.resolve()
}

export let makeWinner = (updatedPlayer: Player): Promise<*> => {
  let {appState} = Store.getState()
  let {bracketsArray} = appState
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
  Store.dispatch(Actions.createBracket(bracketsArray))
}

export let resetBracket = () => Store.dispatch(Actions.resetBracket())

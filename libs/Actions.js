// @flow
export let updatePlayer = (player: Object) => ({type: 'UPDATE_PLAYER', player})
export let createBracket = (bracketsArray: Array<*>, tournamentName?: string) => ({type: 'CREATE_BRACKET', bracketsArray, tournamentName})
export let resetBracket = () => ({type: 'RESET_BRACKET'})

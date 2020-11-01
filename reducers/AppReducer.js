// @flow

module.exports = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case 'UPDATE_PLAYER': return {
      ...state,
      ...action.user
    }
    case 'CREATE_BRACKET':
      return {bracketsArray: action.bracketsArray, tournamentName: action.tournamentName || ''}
    case 'RESET_BRACKET':
    default: return {}
  }
}

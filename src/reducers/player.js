
const initialState = {
  room: null,
  playerNumber: null,
  powerUp: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POWER_UP_GAINED':
      return {
        ...state,
        powerUp: action.payload,
      }
    case 'POWER_UP_USED':
      return {
        ...state,
        powerUp: false,
      }
    case 'SET_PLAYER_ROOM':
      return {
        ...state,
        room: action.payload,
      }
    case 'SET_PLAYER_NUMBER':
      return {
        ...state,
        playerNumber: action.payload,
      }
    case 'SET_SELF':
      return {
        ...state,
        self: action.payload,
      }
    default:
      return state
  }
}


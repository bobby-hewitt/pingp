
const initialState = {
  room: null,
  playerNumber: null
}

export default (state = initialState, action) => {
  switch (action.type) {
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


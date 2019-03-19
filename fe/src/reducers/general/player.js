
const initialState = {
 playerNumber: null,
 room: null,
 name: null,
}

export default (state = initialState, action) => {
  // console.log('ACTION',action)
  switch (action.type) {
    case 'SET_PLAYER_DATA':
    return {
      ...state,
      playerNumber: action.payload.playerNumber,
      room:action.payload.room,
      name:action.payload.name
    }
    default:
      return state
  }
}


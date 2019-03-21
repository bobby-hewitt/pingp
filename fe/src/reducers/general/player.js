
const initialState = {
 playerNumber: null,
 room: null,
 name: null,
}

export default (state = initialState, action) => {
  
  switch (action.type) {
    case 'SET_PLAYER_DATA':
    console.log('Set player data',action.payload)
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


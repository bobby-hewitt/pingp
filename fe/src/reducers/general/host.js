
const initialState = {
 players: [false, false, false, false,false,false],
}

export default (state = initialState, action) => {
  // console.log('ACTION',action)
  switch (action.type) {
    case 'UPDATE_PLAYERS':
    return {
      ...state,
      players: action.payload
    }
    default:
      return state
  }
}



const initialState = {
  gameIsStarted: false,
  gameOver: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameIsStarted: !state.gameIsStarted,
      }
    case 'SET_GAME_OVER':
      return {
        ...state,
        gameOver: action.payload,
      }
    case 'NEW_GAME':
      return {
        ...state,
        gameIsStarted: true,
      }

    default:
      return state
  }
}


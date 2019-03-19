
const initialState = {
  gameIsStarted: false,
  gameOver: false,
  winner: null,
  player1PowerUp:false,
  player2PowerUp: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POWER_UP_PLAYER_1':
      return {
        ...state,
        player1PowerUp: action.payload
      }
    case 'SET_POWER_UP_PLAYER_2':
      return {
        ...state,
        player2PowerUp: action.payload
      }
    case 'START_GAME':
      return {
        ...state,
        gameIsStarted: !state.gameIsStarted,
      }
    case 'SET_GAME_OVER':
      return {
        ...state,
        gameOver: action.payload,
        winner: action.winner,
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


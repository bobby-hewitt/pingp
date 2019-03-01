export const startGame = (payload) => {
  return dispatch => {
    dispatch({
      type: 'START_GAME',
    })
  }
}

export const setGameOver = (payload, winner) => {
  console.log('SETTING GAME OVER', payload, winner)
  return dispatch => {
    dispatch({
      type: 'SET_GAME_OVER',
      payload,
      winner: winner
    })
  }
}

export const powerUpUsedGameplay = (payload) => {
  return dispatch => {
    dispatch({
      type: payload.playerNumber === 1 ? 'SET_POWER_UP_PLAYER_1' : 'SET_POWER_UP_PLAYER_2',
      payload: payload.powerUp,
    })
  }
}


export const leaveGame = (payload) => {
  return dispatch => {
    dispatch({
      type: 'LEAVE_GAME',
    })
  }
}

export const closeRoom = (payload) => {
  return dispatch => {
    dispatch({
      type: 'CLOSE_ROOM',
    })
  }
}

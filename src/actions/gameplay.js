export const startGame = (payload) => {
  return dispatch => {
    dispatch({
      type: 'START_GAME',
    })
  }
}

export const setGameOver = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_GAME_OVER',
      payload
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

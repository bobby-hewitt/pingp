export const updatePlayers = (payload) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_PLAYERS',
      payload
    })
  }
}

export const setScores = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_SCORES',
      payload
    })
  }
}
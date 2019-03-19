export const updatePlayers = (payload) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_PLAYERS',
      payload
    })
  }
}
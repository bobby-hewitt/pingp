export const setSelf = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_SELF',
      payload
    })
  }
}

export const setPlayerData = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_PLAYER_DATA',
      payload
    })
  }
}
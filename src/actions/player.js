export const setPlayerRoom = (payload) => {
  console.log('SETTING PLAYER ROOM')
  return dispatch => {
    dispatch({
      type: 'SET_PLAYER_ROOM',
      payload
    })
  }
}
export const setPlayerNumber = (payload) => {
  console.log('SETTING PLAYER Number')
  return dispatch => {
    dispatch({
      type: 'SET_PLAYER_NUMBER',
      payload
    })
  }
}


export const setSelf = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_SELF',
      payload
    })
  }
}

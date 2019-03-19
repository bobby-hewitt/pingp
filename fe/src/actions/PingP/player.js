export const setPlayerRoom = (payload) => {
  console.log('SETTING PLAYER ROOM')
  return dispatch => {
    dispatch({
      type: 'SET_PLAYER_ROOM',
      payload
    })
  }
}

export const powerUpGained = (payload) => {
  return dispatch => {
    dispatch({
      type: 'POWER_UP_GAINED',
      payload
    })
  }
}

export const powerUpUsed = (payload) => {
  console.log('POWERUP PAYLOAD', payload)
  return dispatch => {
    dispatch({
      type: 'POWER_UP_USED',
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

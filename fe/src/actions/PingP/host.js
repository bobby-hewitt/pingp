export const setRoomCode = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_ROOM_CODE',
      payload
    })
  }
}


export const setCoords1 = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_COORDS_1',
      payload
    })
  }
}
export const setCoords2 = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_COORDS_2',
      payload
    })
  }
}

export const setResponses = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_RESPONSES',
      payload
    })
  }
}


export const startRoundHost = (payload) => {
	console.log('start round host')
  return dispatch => {
    dispatch({
      type: 'START_ROUND_HOST',
      payload
    })
  }
}
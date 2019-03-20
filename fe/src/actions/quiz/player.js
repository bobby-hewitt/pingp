
export const showQuestionPlayer = (payload) => {
	console.log('in action')
  return dispatch => {
    dispatch({
      type: 'QUIZ_SHOW_QUESTION_PLAYER',
      payload
    })
  }
}

export const setWaitingPlayer = (payload) => {
	console.log('in action')
  return dispatch => {
    dispatch({
      type: 'QUIZ_SET_WAITING_PLAYER',
      payload
    })
  }
}


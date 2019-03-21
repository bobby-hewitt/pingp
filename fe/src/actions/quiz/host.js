export const setupGame = (payload) => {
  return dispatch => {
    dispatch({
      type: 'QUIZ_SETUP_GAME_HOST',
      payload
    })
  }
}

export const showQuestionHost = (payload) => {
  return dispatch => {
    dispatch({
      type: 'QUIZ_SHOW_QUESTION_HOST',
      payload
    })
  }
}

export const showAnswer = (payload) => {
  console.log('in action')
  return dispatch => {
    dispatch({
      type: 'QUIZ_SHOW_ANSWERS_HOST',
      payload
    })
  }
}

export const showScores = (payload) => {
  return dispatch => {
    dispatch({
      type: 'QUIZ_SHOW_SCORES_HOST',
      payload
    })
  }
}

export const setResponse = (payload) => {
  return dispatch => {
    dispatch({
      type: 'QUIZ_SET_RESPONSE',
      payload
    })
  }
}




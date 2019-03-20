
const initialState = {
  question: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
   
    case 'QUIZ_SHOW_QUESTION_PLAYER':
      //handles the end of the quiz  
      return {
        ...state,
        question: action.payload
      }
    case 'QUIZ_SET_WAITING_PLAYER':
      //handles the end of the quiz  
      return {
        ...state,
        question: null
      }
    default:
      return state
  }
}


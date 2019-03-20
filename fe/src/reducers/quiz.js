
const initialState = {
  questions: [],
  questionIndex: 0,
  players: [],
  currentQuestion: null,
  quizState: 'break'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'QUIZ_SETUP_GAME':
      return {
        ...state,
        questions: action.payload.questions,
        players: action.payload.players,
      }
    case 'QUIZ_SHOW_QUESTION':
      //handles the end of the quiz
      if (state.currentIndex <= state.questions.length){
        return {
            ...state,
            quizState:'end'
        }
      }
      else {
        //move on to the next question
        return {
          ...state,
          currentQuestion: state.questions[state.questionIndex],  
          questionIndex: state.questionIndex + 1,
          quizState: "question"
        }
      }
    case 'QUIZ_SHOW_ANSWER':
      return {
        ...state 
      }
    case 'QUIZ_SHOW_SCORES':
      return {
        ...state 
      }
    case 'QUIZ_SET_RESPONSE':
      return {
        ...state,
      }
    default:
      return state
  }
}



const initialState = {
  questions: [],
  questionIndex: 0,
  players: [],
  currentQuestion: null,
  quizState: 'break',
  responses: [],
  scores: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'QUIZ_SETUP_GAME_HOST':
      return {
        ...state,
        questions: action.payload.questions,
        currentQuestion: action.payload.questions[0],
        players: action.payload.players,
      }
    case 'QUIZ_SHOW_QUESTION_HOST':
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
          quizState: "question"
        }
      }
    case 'QUIZ_SHOW_ANSWER_HOST':
      return {
        ...state 
      }
    case 'QUIZ_SHOW_SCORES_HOST':
    //need to update questiobn index
      return {
        ...state 
      }
    case 'QUIZ_SET_RESPONSE':
      let newResponses = Object.assign([], state.responses)
      newResponses.push(action.payload)
      return {
        ...state,
        responses: newResponses
      }
    default:
      return state
  }
}


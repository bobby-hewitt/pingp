import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setupGame, showAnswer, showScores } from 'actions/quiz/host'
import SocketListener from 'containers/SocketListener/Quiz'
import { showQuestionSocket } from 'sockets/Quiz/host'
import { showQuestionHost } from 'actions/quiz/host'
import './style.scss'
import Question from './Question'
class QuizHost extends Component {

	constructor(props){
		super(props)
		this.timeouts = {

		}
		this.state = {

		}
	}

	componentWillMount(){
		this.setupGame()
	}

	componentWillReceiveProps(np){
		if ((this.props.responses.length !== this.props.players.length) && (np.responses === this.props.players.length)){

		}
	}

	shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	}

	setupGame(){
		fetch('https://opentdb.com/api.php?amount=10&type=multiple')
			.then((resp) => resp.json()) // Transform the data into json
			.then((data) => {
			// give players scores
			let playersWithScores = []
			for (let i = 0; i < this.props.players.length; i++){
				let player = {
					id: this.props.players[i].id,
					name: this.props.players[i].name,
					score: 0
				}
				if (this.props.player[i]){
					playersWithScores.push(player)
				}
			}
			//shuffle wrong answers with correct ones
			for (let i = 0; i < data.results.length; i++){
				let q = data.results[i]
				q.all_answers = q.incorrect_answers
				q.all_answers.push(q.correct_answer) 
				q.all_answers = this.shuffle(q.all_answers)
			}
			let obj = {
				questions: data.results,
				players: playersWithScores
			}
			this.props.setupGame(obj)
			this.intro()
		})
	}

	intro(){	
		this.showQuestion()
	}

	showQuestion(){
		console.log(this.props)
		showQuestionSocket(this, this.props.socket)
	}

	showAnswer(){
		this.props.showAnswer()
		//force all sockets to waiting state
	}

	showScores(){
		this.props.showScores()
		//move to next question index.
		//reset timings
		//reset responses
	}







	render(){
		const { currentQuestion } = this.props

		return(
			<div className="quizHostContainer">
			<SocketListener isHost socket={this.props.socket} />
				{this.props.quizState === 'break' &&
					<p>Break</p>
				}
				{this.props.quizState === 'question' &&
					<Question question={currentQuestion}/>
				}
				{this.props.quizState === 'answer' &&
					<p>Answer</p>
				}
				{this.props.quizState === 'end' &&
					<p>End</p>
				}
			</div>
		)
	}
}


const mapStateToProps = state => ({
	room: state.generalHost.room,
	players: state.generalHost.players,
	router: state.router,
	quizPlayers: state.quizHost.players,
	currentQuestion: state.quizHost.currentQuestion,
	quizState: state.quizHost.quizState,

})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setupGame,
  showAnswer,
  showQuestionHost,
  showScores,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizHost)
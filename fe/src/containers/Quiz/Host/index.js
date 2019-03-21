import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SocketListener from 'containers/SocketListener/Quiz'
import { showQuestionSocket } from 'sockets/Quiz/host'
import { updatePlayers } from 'actions/general/host'
import { setupGame, showAnswer, showScores, showQuestionHost } from 'actions/quiz/host'
import './style.scss'
import Question from './Question'
import PlayerResponse from './PlayerResponse'
class QuizHost extends Component {

	constructor(props){
		super(props)
		this.timeout = null
		this.timeout2 = null
		this.state = {

		}
	}

	componentWillMount(){
		this.setupGame()
	}

	getNumberOfTruthies(array){
		let count = 0
		for (var i = 0; i < array.length; i++){
			if(array[i]) count += 1
		}
		return count
	}



	compareResponsesToPlayers(responses){
		console.log('responses', responses.length)

		let players = this.props.players;
		let allPlayersHaveResponded = true;
		for (var i = 0; i < players.length; i++){
			if (players[i]){
				let hasResponded = responses.find(r => r.id === players[i].id)
				if (!hasResponded){
					allPlayersHaveResponded = false
				}
			}
		}
		if (allPlayersHaveResponded){
			console.log('All responses recieved ')
			this.calculateScores(responses)
		} else {
			console.log('Not recieved all responses')
		}
	}

	componentWillReceiveProps(np){
		if (this.props.responses.length !== np.responses.length && np.responses.length){
			//check to see if all active players have responded

			this.compareResponsesToPlayers(np.responses)
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
			.then((resp) => resp.json())
			.then((data) => {
			//reset scores
			for (var i = 0; i < this.props.players.length; i++){
				if (this.props.players[i])this.props.players[i].score = 0			
			}
			this.props.updatePlayers(this.props.players)
			//shuffle incorrect and correct answers together and note the position of correct answer
			for (let i = 0; i < data.results.length; i++){
				let q = data.results[i]
				q.all_answers = q.incorrect_answers
				q.all_answers.push(q.correct_answer) 
				q.all_answers = this.shuffle(q.all_answers)
				q.correct_index = q.all_answers.indexOf(q.correct_answer)
			}
			this.props.setupGame({questions: data.results})
			this.intro()
		})
		.catch((err) => {
			console.log('error fetchi9ng data', err)
		})
	}

	intro(){	
		this.showQuestion()
	}

	showQuestion(){
		for (var i = this.props.players.length - 1; i >= 0; i--) {
			if (this.props.players[i]){
				console.log(this.props.players[i].name, this.props.players[i].score)
			}
		}
		showQuestionSocket(this, this.props.socket)
	}

	showAnswer(){
		this.timeout = setTimeout(() => {
			this.props.showAnswer()
		},1000)
		this.timeout2 = setTimeout(() => {
			showQuestionSocket(this, this.props.socket)
		},5500)
	}

	componentWillUnmount(){
		clearTimeout(this.timeout)
		clearTimeout(this.timeout2)
	}

	calculateScores(responses){
		let players = this.props.players
		let startTime = this.props.startTime
		let foundFirstCorrectAnswer = false
		for (var i = 0; i < responses.length; i++){	
			for (var j = 0; j < players.length; j++){
				if (players[j] && responses[i].id === players[j].id){
					if (responses[i].correct){
						players[j].score += 100
						if (!foundFirstCorrectAnswer){
							players[j].score += 50
							players[j].bonus = true
							foundFirstCorrectAnswer = true
						} else {
							players[j].bonus = false
						}
					} else {
						players[j].bonus = false
					}	
				}
			} 
		}
		this.props.updatePlayers(players)
		this.showAnswer()
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
				{(this.props.quizState === 'question' || this.props.quizState === 'answer') &&
					<div className="sceneContainer">
					<Question question={currentQuestion} quizState={this.props.quizState}/>
					<div className="responsesContainerHost">
						{this.props.players && this.props.players.map((player, i) => {
							if (player){
								return(
									<PlayerResponse key={i} bonus={player.bonus} response={this.props.responses.find(r => r.id === player.id)} {...player} quizState={this.props.quizState}/>
								)
							} else {
								return(
									<div key={i}/>
								)
							}
						})}
					</div>
					</div>
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
	startTime: state.quizHost.startTime,
	players: state.generalHost.players,
	router: state.router,
	responses: state.quizHost.responses,
	quizPlayers: state.quizHost.players,
	currentQuestion: state.quizHost.currentQuestion,
	quizState: state.quizHost.quizState,

})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setupGame,
  updatePlayers,
  showAnswer,
  showQuestionHost,
  showScores,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizHost)
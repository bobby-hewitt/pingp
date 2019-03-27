import React, { Component } from 'react'
import SocketListener from 'containers/SocketListener/Quiz'
import Button from 'components/Button'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendResponse } from 'sockets/Quiz/player'
import { setWaitingPlayer } from 'actions/quiz/player'
import './style.scss'

class QuizMobile extends Component {

	onClick(index){
		let obj = {
			time: (new Date()).getTime(),
			response: index,
			id: this.props.socketId,
			room: this.props.room,
			name: this.props.name,
			correct: index === this.props.question.correct_index
		}
		sendResponse(this, obj, this.props.socket)
	}

	componentWillMount(){
		if (!this.props.room){
			this.props.push('/join')
		}
	}

	render(){
		
		return(
			<div className="quizMobileContainer">
				<SocketListener socket={this.props.socket} />
				
				{this.props.question && 
					<div>
					<p className="mobileQuestion">{this.props.question.question}</p>
					{this.props.question.all_answers.map((answer, i) => {
						return(
							<Button key={i} text={answer} onClick={this.onClick.bind(this, i)}/>
						)
					})}
					</div>
				}
				

			</div>
		)
	}
}


const mapStateToProps = state => ({
	socketId: state.generalPlayer.id,
	room: state.generalPlayer.room,
	players: state.generalHost.players,
	name: state.generalPlayer.name,
	router: state.router,
	quizPlayers: state.quizHost.players,
	currentQuestion: state.quizHost.currentQuestion,
	question: state.quizPlayer.question,

})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setWaitingPlayer,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizMobile)
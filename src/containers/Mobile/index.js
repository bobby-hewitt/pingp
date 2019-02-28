import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import SocketListener from '../SocketListener'
import { joinRoom, sendOrientation, startGameSocket, quitGameSocket, restartGameSocket } from '../../sockets/player'
import { setSelf  } from '../../actions/player'
import { startGame } from '../../actions/gameplay'

class Mobile extends Component {

	constructor(props){
		super(props)
		this.state = {
			xDir: 0,
			yDir: 0,
		}
	}

	componentWillMount(){
		let code = window.location.pathname.split('/')[2]
		if (code){
			let obj = {
		      name: '',
		      room: code.toUpperCase()
		    }
		    joinRoom(obj, this)
		}

	}

	componentWillReceiveProps(np){
		if (!np.playerNumber && this.props.playerNumber){
			this.props.push('not-found')
		}
	}

	componentDidMount(){
	// if (this.props.playerNumber === null){
	// 		this.props.push('/not-found')
	// 	}	
		window.addEventListener('deviceorientation', (orientation) => {
			let y = this.findLimit(orientation.beta)
			
			if (y !== this.state.yDir){				
				let dirs = {
					y: y,
					playerNumber: this.props.playerNumber
				}
				console.log('sending oritentation', y)
				sendOrientation(dirs, this)
				this.setState({yDir: y})
			}
		})
	}

	findLimit(coord){
		if (coord < -47.5) return -21
		else if (coord < -42.5) return -19
		else if (coord < -37.5) return -16
		else if (coord < -32.5) return -13
		else if (coord < -27.5) return -10
		else if (coord < -22.5) return -8
		else if (coord < -17.5) return -6
		else if (coord < -12.5) return -4
		else if (coord < -7.5) return -2
		else if (coord < -2.5) return -1
		else if (coord < 2.5) return 0
		else if (coord < 7.5) return 1
		else if (coord < 12.5) return 2
		else if (coord < 17.5 ) return 4
		else if (coord < 22.5 ) return 6
		else if (coord < 27.5 ) return 8
		else if (coord < 32.5 ) return 10
		else if (coord < 37.5 ) return 13
		else if (coord < 42.5 ) return 16
		else if (coord < 47.5 ) return 19
		else return 21
	}

	render(){
		return(
			<div className="mobile">
				<SocketListener />
				{!this.props.gameOver &&
					<div className="mobileInstructions">
						<h3>Player {JSON.stringify(this.props.playerNumber)}</h3>
						<p >Tilt phone to control paddle</p>
					</div>
				}
				{this.props.gameOver &&
					<div className="mobileInstructions">
						<h3>Game over</h3>
						<p >Restart or quit game</p>
					</div>
				}
				<div className="quitButtonMobile" onClick={quitGameSocket.bind(this, this)} >
					<h6>Quit game</h6>
				</div>
				{!this.props.gameIsStarted && !this.props.gameOver &&
 					<div className="buttonMobile" onClick={startGameSocket.bind(this, this)} >
						<h6>Play</h6>
					</div>
				}
				{this.props.gameIsStarted && !this.props.gameOver &&
					<div className="buttonMobile" onClick={startGameSocket.bind(this, this)} >
						<h6>Pause</h6>
					</div>
				}
				{this.props.gameOver &&
					<div className="buttonMobile" onClick={restartGameSocket.bind(this, this)} >
						<h6>Restart game</h6>
					</div>
				}

					
			
			</div>
		)
	}
}

const mapStateToProps = state => ({
	gameIsStarted: state.gameplay.gameIsStarted,
	router: state.router,
	room: state.player.room,
	playerNumber: state.player.playerNumber,
	gameOver: state.gameplay.gameOver,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setSelf,
  startGame,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mobile)
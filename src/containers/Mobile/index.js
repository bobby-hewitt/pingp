import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import SocketListener from '../SocketListener'
import { joinRoom, sendOrientation, startGameSocket, quitGameSocket, restartGameSocket, powerUpUsedSocket } from '../../sockets/player'
import { setSelf, powerUpUsed  } from '../../actions/player'
import { startGame, setGameOver } from '../../actions/gameplay'

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
		window.addEventListener('deviceorientation', (orientation) => {
			let y = this.findLimit(orientation.beta)
			let x = this.findLimit(orientation.gamma)
			if (y !== this.state.yDir || x !== this.state.xDir){				
				let dirs = {
					y: y,
					playerNumber: this.props.playerNumber
				}
				sendOrientation(dirs, this)
				this.setState({yDir: y, xDir: x})
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

	usePowerUp(){
		let obj = {
			room: this.props.room,
			playerNumber: this.props.playerNumber,
			powerUp: this.props.powerUp
		}
		
		powerUpUsedSocket(obj, this)
	}

	render(){
		return(
			<div className="mobile">
				<SocketListener />
				<div className="info">	
					<div className="buttonSetMobile">
						<div className="pausePlay buttonMobile">
							{!this.props.gameIsStarted && !this.props.gameOver &&
								<img src={require('assets/images/playBlack.png')} className="play" onClick={startGameSocket.bind(this, this)}/>
							}
							{this.props.gameIsStarted && !this.props.gameOver &&
								<img src={require('assets/images/pauseBlack.png')} onClick={startGameSocket.bind(this, this)}/>
							}
							{this.props.gameOver &&
								<img src={require('assets/images/playBlack.png')} className="play" onClick={restartGameSocket.bind(this, this)}/>
							}
						</div>
						{!this.props.gameOver &&
							<p className="headerMobile">Player{JSON.stringify(this.props.playerNumber) === 'null' ? 0 : JSON.stringify(this.props.playerNumber)} </p>
						}
						{this.props.gameOver &&
							<p className="headerMobile">Player{JSON.stringify(this.props.playerNumber) === 'null' ? 0 : JSON.stringify(this.props.playerNumber)} </p>
						}
						<div className="buttonMobile warning quit" onClick={quitGameSocket.bind(this, this)} >
							<p>Quit</p>
						</div>	
					</div>	
				</div>
				<div className="gamePadContainer">
						<div className="gamePad">
							<p className="instructionsMobile">Tilt phone to control paddle</p>
							{this.props.gameOver &&
								<p className="playerResult">{this.props.winner.indexOf(this.props.playerNumber) > -1 ? 'You win' : 'You lose'}</p>
							}
							{this.props.powerUp && !this.props.gameOver &&
								<div className="powerUpContainer" onClick={this.usePowerUp.bind(this)} >
									<p>
										{
											this.props.powerUp === 'invertOpponent' ? "Invert opponent's controls" : 
											this.props.powerUp === 'multiBall' ? 'Multi ball' : 
											this.props.powerUp === 'offYourLine' ? 'Come off your line' : 
											''
										}
									</p>
									{this.props.powerUp === 'multiBall' && <img className="powerUpImage" src={require('../../assets/images/multiBall.png')} />}
									{this.props.powerUp === 'invertOpponent' && <img className="powerUpImage" src={require('../../assets/images/invertOpponent.png')} />}
									{this.props.powerUp === 'offYourLine' && <img className="powerUpImage" src={require('../../assets/images/offYourLine.png')} />}

								</div>
							}
						</div>
				</div>
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
	winner: state.gameplay.winner,
	powerUp: state.player.powerUp
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setSelf,
  setGameOver,
  powerUpUsed,
  startGame,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mobile)